﻿using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Reflection;
using Shesha.Bootstrappers;
using Shesha.Configuration.Runtime;
using Shesha.Domain;
using Shesha.Metadata;
using Shesha.Metadata.Dtos;
using Shesha.Reflection;
using Shesha.Utilities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Uow;
using Abp.ObjectMapping;
using Shesha.Extensions;
using Shesha.Permissions;
using Shesha.Services.VersionedFields;
using Shesha.ConfigurationItems;
using Shesha.Domain.ConfigurationItems;

namespace Shesha.Permission
{
    [DependsOnBootstrapper(typeof(ConfigurableModuleBootstrapper))]
    public class PermissionedObjectsBootstrapper : IBootstrapper, ITransientDependency
    {
        private readonly IRepository<PermissionedObject, Guid> _permissionedObjectRepository;
        private readonly IObjectMapper _objectMapper;
        private readonly IVersionedFieldManager _versionedFieldManager;
        private readonly IRepository<Module, Guid> _moduleReporsitory;

        public PermissionedObjectsBootstrapper(
            IRepository<PermissionedObject, Guid> permissionedObjectRepository,
            IObjectMapper objectMapper,
            IVersionedFieldManager versionedFieldManager,
            IRepository<Module, Guid> moduleReporsitory
        )
        {
            _permissionedObjectRepository = permissionedObjectRepository;
            _objectMapper = objectMapper;
            _versionedFieldManager = versionedFieldManager;
            _moduleReporsitory = moduleReporsitory;
        }

        public async Task ProcessAsync()
        {
            // ToDo: use UOW!!!!!!!!!

            var providers = IocManager.Instance.ResolveAll<IPermissionedObjectProvider>();
            foreach (var permissionedObjectProvider in providers)
            {
                var objectTypes = permissionedObjectProvider.GetObjectTypes();

                foreach (var objectType in objectTypes)
                {
                    var items = permissionedObjectProvider.GetAll(objectType);

                    var dbItems = await _permissionedObjectRepository.GetAll()
                        .Where(x => x.Type == objectType || x.Type.Contains($"{objectType}.")).ToListAsync();


                    // Add news items
                    var toAdd = items.Where(i => dbItems.All(dbi => dbi.Object != i.Object))
                        .ToList();
                    foreach (var item in toAdd)
                    {
                        var dbItem = _objectMapper.Map<PermissionedObject>(item);
                        dbItem.Module = _moduleReporsitory.FirstOrDefault(x => x.Id == item.ModuleId);
                        var obj = await _permissionedObjectRepository.InsertAsync(dbItem);
                        foreach (var parameter in item.AdditionalParameters)
                        {
                            await _versionedFieldManager.SetVersionedFieldValueAsync<PermissionedObject, Guid>(obj, parameter.Key, parameter.Value, false);
                        }
                    }

                    // ToDo: think how to update Protected objects in the bootstrapper
                    // Update items
                    var toUpdate = dbItems.Where(dbi => items.Any(i => dbi.Object == i.Object)).ToList();
                    foreach (var dbItem in toUpdate)
                    {
                        var item = items.FirstOrDefault(x => x.Object == dbItem.Object);
                        if (item == null) continue;
                        dbItem.Module = _moduleReporsitory.FirstOrDefault(x => x.Id == item.ModuleId);
                        dbItem.Parent = item.Parent;
                        dbItem.Name = item.Name;
                        await _permissionedObjectRepository.UpdateAsync(dbItem);
                        foreach (var parameter in item.AdditionalParameters)
                        {
                            await _versionedFieldManager.SetVersionedFieldValueAsync<PermissionedObject, Guid>(dbItem, parameter.Key, parameter.Value, false);
                        }
                    }

                    // Inactivate deleted items
                    var toDelete = dbItems.Where(dbi => items.All(i => dbi.Object != i.Object)).ToList();
                    foreach (var item in toDelete)
                    {
                        await _permissionedObjectRepository.DeleteAsync(item);
                    }
                }
            }
            
            // todo: write changelog
        }
    }
}
