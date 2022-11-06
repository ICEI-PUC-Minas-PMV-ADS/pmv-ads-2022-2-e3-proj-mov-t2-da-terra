using WebApi.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using Newtonsoft.Json;
namespace WebApi;



    Venda venda1 = new Venda(1,"dadsas","afsdfas");
    Venda venda2 = new Venda(2, "Mterial sala","20:21");
    public List<Venda> vendas = new List<Venda>();
    vendas.Add(venda1);
    
    string serializado = JsonConvert.SerializeObject(vendas,Formatting.Indented);
    Console.WriteLine(serializado);
