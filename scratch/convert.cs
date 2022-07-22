public class SRClient
{
  public DateTime FirstRun { get; set; }
  public DateTime LastActive { get; set; }
}
var jsDate = new SRClient();
jsDate.FirstRun = Convert.ToDateTime("2022-03-17T08:02:54.665Z");
Console.WriteLine(jsDate.FirstRun);
