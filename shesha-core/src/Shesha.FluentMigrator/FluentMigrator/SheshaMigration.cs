﻿using FluentMigrator;
using System.Data;

namespace Shesha.FluentMigrator
{
    /// <summary>
    /// 
    /// </summary>
    public abstract class SheshaMigration: Migration
    {
        /// <summary>
        /// Create checklist if missing
        /// </summary>
        /// <returns></returns>
        public void CreateCheckListIfMissing(Guid id, string name, string description)
        {
          Execute.WithConnection((connection, transaction) =>
          {
              using var command = connection.CreateCommand();
              command.Transaction = transaction;
              command.CommandText = 
@"if not exists(select 1 from Core_CheckLists where Id = @id)
	insert into Core_CheckLists (Id, Name, Description) values (@id, @name, @description)";

              AddParameter(command, "@id", id);
              AddParameter(command, "@name", name);
              AddParameter(command, "@description", description);

              command.ExecuteNonQuery();
          });
        }

        private void AddParameter(IDbCommand command, string name, object value)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = name;
            parameter.Value = value;
            command.Parameters.Add(parameter);
        }

        /*
        /// <summary>
        /// 
        /// </summary>
        /// <param name="table"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool RowExists(string table, object id)
        {
            this.ApplicationContext
            var exists = false;
            Execute.WithConnection((connection, transaction) =>
            {
                using var command = connection.CreateCommand();
                command.CommandText = $"select 1 from {table} where Id = :Id";
                var param = command.CreateParameter();
                param.ParameterName = "Id";
                param.Value = id;

                exists = command.ExecuteScalar() != null;
            });

            return exists;
        }
        */
    }
}
