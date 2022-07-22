using System;
using System.Reflection;
using System.Text;

public class Dumper
{
	protected Dumper()
	{
	}

	public static string DumpObject(object obj)
	{
		return Dumper.DumpObject(obj, -1).Replace("<", "&lt;").Replace(">", "&gt;");
	}

	public static string DumpObject(object obj, int MaxLevel)
	{
		StringBuilder sb;

		sb = new StringBuilder();
		if (obj == null)
			return "Nothing";
		else
		{
			Dumper.PrivDump(sb, obj, "[Dumpable]", 0, MaxLevel);
			return sb.ToString();
		}
	}

	public static object GetFieldValue(object obj, string fieldName)
	{
		FieldInfo fi;
		Type t;

		t = obj.GetType();
		fi = t.GetField(fieldName, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
		if (fi == null)
			return null;
		else
			return fi.GetValue(obj);
	}

	protected static void PrivDump(StringBuilder sb, object obj, string objName, int level, int MaxLevel)
	{

		if (obj == null)
			return;
		if (MaxLevel >= 0 && level >= MaxLevel)
			return;

		string padstr;
		padstr = "";
		for (int i = 0; i < level; i++)
			if (i < level - 1)
				padstr += " |";
			else
				padstr += " +";
		string str;
		String[] strarr;
		Type t;
		t = obj.GetType();
		strarr = new String[7];
		strarr[0] = padstr;
		strarr[1] = objName;
		strarr[2] = " AS ";
		strarr[3] = t.FullName;
		strarr[4] = " = ";
		strarr[5] = obj.ToString();
		strarr[6] = "\r\n";
		sb.AppendJoin("", strarr);
		if (obj.GetType().BaseType == typeof(ValueType))
		{
			return;
		}
		Dumper.DumpType(padstr, sb, obj, level, t, MaxLevel);
		Type bt;
		bt = t.BaseType;
		if (bt != null)
		{
			while (!(bt == typeof(Object)))
			{
				str = bt.FullName;
				sb.AppendJoin("", padstr + "(" + str + ")\r\n");
				Dumper.DumpType(padstr, sb, obj, level, bt, MaxLevel);
				bt = bt.BaseType;
				if (bt != null)
					continue;
				break;
			} while (bt != typeof(Object)) ;
		}
	}

	protected static void DumpType(string InitialStr, StringBuilder sb, object obj, int level, System.Type t, int maxlevel)
	{
		FieldInfo[] fi;
		fi = t.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
		if (t == typeof(System.Delegate)) return;
		foreach (FieldInfo f in fi)
			PrivDump(sb, f.GetValue(obj), f.Name, level + 1, maxlevel);
		object[] arl;
		int i;
		if (obj is System.Array)
		{
			try
			{
				arl = (object[])obj;
				for (i = 0; i < arl.GetLength(0); i++)
					PrivDump(sb, arl[i], "[" + i + "]", level + 1, maxlevel);
			}
			catch (Exception) { }
		}
	}
}
void dump(object a)
{
	Console.WriteLine(Dumper.DumpObject(a));
}
		