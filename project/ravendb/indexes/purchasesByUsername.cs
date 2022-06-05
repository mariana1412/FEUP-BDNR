using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Linq;
using Raven.Client.Documents.Indexes;

public class Index_purchasesByUsername : AbstractIndexCreationTask
{
    public override string IndexName => "purchasesByUsername";

    public override IndexDefinition CreateIndexDefinition()
    {
        return new IndexDefinition
        {
            Maps =
            {
            @"from purchase in docs.Purchases
select new {
    username = LoadDocument(purchase.client, ""Clients"").username,
    purchase.orderDate
}"
            }
        };
    }
}