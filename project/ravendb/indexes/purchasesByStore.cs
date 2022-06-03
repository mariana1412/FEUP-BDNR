using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Linq;
using Raven.Client.Documents.Indexes;

public class Index_purchaseLines : AbstractIndexCreationTask
{
    public override string IndexName => "purchaseLines";

    public override IndexDefinition CreateIndexDefinition()
    {
        return new IndexDefinition
        {
            Maps =
            {
            @"from purchase in docs.Purchases
from line in purchase.lines
select new { 
    line.store,
    products = new [] { new { line.productId, line.productName, line.price, line.quantity } },
    purchase.Id,
    line.price
}"
            },
            Reduce = @"from r in results
group r by new { r.Id, r.store } into g
select new {
    store = g.Key.store,
    Id = g.Key.Id,
    products = g.SelectMany(x => x.products),
    price = g.Sum(x => x.price)
}",
            Fields =
            {
                { "__all_fields", new IndexFieldOptions
                {
                    Storage = FieldStorage.Yes } }
            }
        };
    }
}