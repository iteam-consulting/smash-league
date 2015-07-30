﻿using Newtonsoft.Json.Linq;

namespace SmashLeague.OAuth.Battlenet
{
    public static class BattlenetAuthenticationHelper
    {
        public static string GetId(JObject user) => user.Value<string>("id");

        public static string GetBattletag(JObject user) => user.Value<string>("battletag");
    }
}
