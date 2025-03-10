﻿using Abp.Dependency;
using Abp.Domain.Repositories;
using Newtonsoft.Json;
using Shesha.ConfigurationItems.Distribution;
using Shesha.Domain;
using Shesha.Notifications.Distribution.NotificationChannels.Dto;
using Shesha.Services;
using Shesha.StoredFiles;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Shesha.Notifications.Distribution.NotificationChannels
{
    /// <summary>
    /// file template import
    /// </summary>
    public class NotificationChannelExport : INotificationChannelExport, ITransientDependency
    {
        private readonly IRepository<NotificationChannelConfig, Guid> _configurationRepo;

        public NotificationChannelExport(IRepository<NotificationChannelConfig, Guid> configurationRepo)
        {
            _configurationRepo = configurationRepo;
        }

        public string ItemType => NotificationChannelConfig.ItemTypeName;

        public async Task<DistributedConfigurableItemBase> ExportItemAsync(Guid id)
        {
            var item = await _configurationRepo.GetAsync(id);
            return await ExportItemAsync(item);
        }

        public async Task<DistributedConfigurableItemBase> ExportItemAsync(ConfigurationItemBase item)
        {
            if (!(item is NotificationChannelConfig itemConfig))
                throw new ArgumentException($"Wrong type of argument {item}. Expected {nameof(NotificationChannelConfig)}, actual: {item.GetType().FullName}", nameof(item));

            var result = new DistributedNotificationChannel
            {
                Id = itemConfig.Id,
                Name = itemConfig.Name,
                ModuleName = itemConfig.Module?.Name,
                FrontEndApplication = itemConfig.Application?.AppKey,
                ItemType = itemConfig.ItemType,

                Label = itemConfig.Label,
                Description = itemConfig.Description,
                OriginId = itemConfig.Origin?.Id,
                BaseItem = itemConfig.BaseItem?.Id,
                VersionNo = itemConfig.VersionNo,
                VersionStatus = itemConfig.VersionStatus,
                ParentVersionId = itemConfig.ParentVersion?.Id,
                Suppress = itemConfig.Suppress,

                // specific properties

                SupportedFormat = itemConfig.SupportedFormat,
                MaxMessageSize = itemConfig.MaxMessageSize,
                SupportedMechanism = itemConfig.SupportedMechanism,
                SenderTypeName = itemConfig.SenderTypeName,
                DefaultPriority = itemConfig.DefaultPriority,
                Status = itemConfig.Status,
            };

            return await Task.FromResult<DistributedConfigurableItemBase>(result);
        }

        /// inheritedDoc
        public async Task WriteToJsonAsync(DistributedConfigurableItemBase item, Stream jsonStream)
        {
            var json = JsonConvert.SerializeObject(item, Formatting.Indented);
            using (var writer = new StreamWriter(jsonStream))
            {
                await writer.WriteAsync(json);
            }
        }
    }
}
