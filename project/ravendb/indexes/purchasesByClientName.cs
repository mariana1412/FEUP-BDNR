using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Linq;
using Raven.Client.Documents.Indexes;

public class Index_purchasesByClientName : AbstractIndexCreationTask
{
    public override string IndexName => "purchasesByClientName";

    public override IndexDefinition CreateIndexDefinition()
    {
        return new IndexDefinition
        {
            Maps =
            {
            @"from purchase in docs.Purchases
select new {
    clientName = LoadDocument(purchase.client, ""Clients"").name
}"
            }
        };
    }
}