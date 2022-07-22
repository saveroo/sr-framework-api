using System;
using System.Text;
using System.Security.Cryptography;


var s = Encoding.UTF8.GetBytes("SRFramework");

Console.WriteLine(s.AsSpan().ToString());