function pluralString(n, base)
{
    if (n == 0) return "";
    else if (n == 1) return '1\xa0' + base + ', ';
    else return n + '\xa0' + base + 's, ';
}

function deltaToString(distance)
{
    if (isNaN(distance))
    {
      return "???";
    }
    distance /= 1000;  // from milliseconds
    var seconds = Math.floor(distance % 60);
    distance -= seconds;
    distance /= 60;
    var minutes = Math.floor(distance % 60);
    distance = (distance - minutes) / 60;
    var hours = Math.floor(distance % 24);
    distance = (distance - hours) / 24;
    var days = Math.floor(distance % 365);
    distance = (distance - days) / 365;
    var years = Math.floor(distance);

    var s = pluralString(years, 'year') + pluralString(days, 'day');
    s += pluralString(hours, 'hour') + pluralString(minutes, 'minute');

    return s + seconds + "\xa0seconds";
}

function updateDict()
{
  var now = new Date().getTime();
  for (key in timing)
  {
    var entry = timing[key];
    if (!entry["start_t"])  entry["start_t"] = new Date(entry["start"]).getTime();
    if (!entry["end_t"])    entry["end_t"]   = new Date(entry["end"]).getTime();
    if (!entry["lifespan"]) entry["lifespan"] = entry["end_t"] - entry["start_t"];

    var start = new Date(timing[key]["start"]);
    if (entry["end_t"] < now)
    {
        entry["status"] = "expired";
        continue;
    }
    else if (now < entry["start_t"])
    {
        entry["status"] = "future";
        entry["release"] = entry["start_t"] - now;
    }
    else
    {
        entry["status"] = "active";
        entry["age"] = now - entry["start_t"];
    }
    entry["delta"] = entry["end_t"] - now;
  }
}
