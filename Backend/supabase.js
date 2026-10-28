
const SUPABASE_URL = "https://gxlaonyvvsxquoqskdne.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_QJw1FntoKfbd_n85VWQ-Xw_Vn0oyLsm";

let client = null;

if (window.supabase && typeof window.supabase.createClient === "function") {
  if (
    SUPABASE_URL &&
    SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
    SUPABASE_PUBLISHABLE_KEY &&
    SUPABASE_PUBLISHABLE_KEY !== "YOUR_SUPABASE_PUBLISHABLE_KEY"
  ) {
    client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );
  } else {
    console.warn(
      "ChildShild: Supabase credentials are not configured yet. Replace YOUR_SUPABASE_PROJECT_URL and YOUR_SUPABASE_PUBLISHABLE_KEY in Backend/supabase.js with your project details."
    );
  }
} else {
  console.error(
    "ChildShild: Supabase JS library not found. Ensure the CDN script tag is included before Backend/supabase.js."
  );
}

window.childShildSupabase = client;
