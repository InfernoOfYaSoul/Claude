/* =====================================================================
   Noor UI kit — Tailwind (Play CDN) config + components
   1:1 from Figma "Presentation" (NEDlU2VEgx46CUa2Ais71N)
   Sections used: Components (217:3861), Icons (217:3862),
   Typography (217:3863), Colors (217:3884), Slide (217:4061)
   Loaded after <script src="https://cdn.tailwindcss.com"></script>
   ===================================================================== */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        // display: big titles / covers / dividers / footer page-number
        sora:     ["Sora", "system-ui", "sans-serif"],
        // body: everything else by default (table headers, labels, tags)
        onest:    ["Onest", "system-ui", "sans-serif"],
        sans:     ["Onest", "system-ui", "sans-serif"],
      },
      colors: {
        // ---- neutral scale, 1:1 from Figma "Colors" ----
        neutral: {
          0:   "#000000",
          15:  "#282829",
          40:  "#717172",
          50:  "#8C8C8D",
          60:  "#979899",
          90:  "#E1E1E3",
          92:  "#EDEEF0",
          95:  "#F7F8FA",
          100: "#FFFFFF",
        },
        // ---- accent: single warm red (used flat, no tint scale) ----
        terracota: { 40: "#FF6757" },
        // ---- accent: blue scale (fills, tints) ----
        sky: {
          40: "#337DFF",
          55: "#71B4FF",
          80: "#D8EBFF",
          90: "#F0F7FF",
        },
      },
      // ---- 20 text styles from Figma "Typography" (217:3863) ----
      fontSize: {
        "display-1": ["150px", { lineHeight: "1.2",  letterSpacing: "0" }],
        "display-2": ["120px", { lineHeight: "1.2",  letterSpacing: "0" }],
        "header-1":  ["100px", { lineHeight: "110px", letterSpacing: "0" }],
        "header-2":  ["80px",  { lineHeight: "1.2",  letterSpacing: "0.4px" }],
        "header-3":  ["56px",  { lineHeight: "1.2",  letterSpacing: "0.416px" }],
        "header-4":  ["40px",  { lineHeight: "44px", letterSpacing: "0.5px" }],
        "header-5":  ["32px",  { lineHeight: "1.25", letterSpacing: "0.416px" }],
        "body-1":    ["32px",  { lineHeight: "1.2",  letterSpacing: "0.4px" }],
        "body-2":    ["32px",  { lineHeight: "40px", letterSpacing: "0.25px" }],
        "body-3":    ["32px",  { lineHeight: "1.25", letterSpacing: "0.4px" }],
        "body-4":    ["28px",  { lineHeight: "40px", letterSpacing: "0.5512px" }],
        "body-5":    ["28px",  { lineHeight: "40px", letterSpacing: "0.4px" }],
        "body-6":    ["28px",  { lineHeight: "40px", letterSpacing: "0.25px" }],
        "label-1":   ["24px",  { lineHeight: "1.25", letterSpacing: "0.5px" }],
        "label-2":   ["24px",  { lineHeight: "1.25", letterSpacing: "0.5512px" }],
        "label-3":   ["20px",  { lineHeight: "1.25", letterSpacing: "0" }],
        "label-4":   ["20px",  { lineHeight: "1.5",  letterSpacing: "0.2px" }],
        "label-5":   ["18px",  { lineHeight: "1.25", letterSpacing: "0.5512px" }],
        "label-6":   ["16px",  { lineHeight: "1.2",  letterSpacing: "0.4px" }],
        "footer-n":  ["32px",  { lineHeight: "40px", letterSpacing: "0.5px" }],
      },
    },
  },
  plugins: [
    function ({ addBase, addComponents }) {
      addBase([
        // Google Fonts — Sora (600/700), Onest (400/500/600/700)
        { "body": { "-webkit-font-smoothing": "antialiased", "-moz-osx-font-smoothing": "grayscale", "text-rendering": "optimizeLegibility" } },
      ]);

      addComponents({
        /* ---------- Slide shell ---------- */
        ".footer": {
          display: "flex", alignItems: "center", gap: "56px", whiteSpace: "nowrap",
          "& .ft-n":   { fontFamily: "Sora", fontWeight: "600" },
          "& .ft-txt": { flex: "1 1 0", minWidth: "0" },
        },
        ".cover-gradient": {
          position: "absolute", inset: "0",
          backgroundImage: "linear-gradient(192.1deg, #FF6757 22.073%, #337DFF 101.08%)",
        },
        ".cover-dark": {
          position: "absolute", inset: "0", background: "#090E18", overflow: "hidden",
        },

        /* ---------- Text blocks ---------- */
        ".tb-tag": { display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", width: "350px" },
        ".tb-tag .chip": { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "16px 32px", borderRadius: "100px", border: "2px solid #FF6757" },
        ".tb-tag2": { display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start", width: "425px" },
        ".tb-tag2 .chip": { display: "inline-flex", alignItems: "flex-start", padding: "8px 32px", borderRadius: "72px", border: "2px solid #FF6757" },
        ".tb-tag3": { display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start", width: "425px" },
        ".tb-tag3 .chip": { display: "inline-flex", alignItems: "center", height: "56px", padding: "8px 32px", borderRadius: "72px", background: "#000000" },
        ".tb-number": { display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-start", width: "480px" },
        ".tb-icon": { display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start", width: "300px" },
        ".tb-icon2": { display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start", width: "520px" },
        ".tb-icon2 .row": { display: "flex", gap: "24px", alignItems: "center", width: "100%" },
        ".tb-icon .row": { display: "flex", flexDirection: "column", gap: "32px", alignItems: "flex-start", width: "100%" },
        ".tb1": { display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start", width: "821px" },

        /* ---------- Filled blocks (colored panels) ---------- */
        ".fill-block": { display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start", padding: "32px", borderRadius: "24px" },
        ".fill-block2": { display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center", padding: "24px 32px", borderRadius: "24px", textAlign: "center" },
        ".conclusion": { display: "flex", alignItems: "center", padding: "16px 24px", borderRadius: "24px", background: "#FF6757" },

        /* ---------- Pills / tags ---------- */
        ".pill-l-filled":  { display: "inline-flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", height: "56px", padding: "8px 32px", borderRadius: "72px", background: "#337DFF" },
        ".pill-l-stroke":  { display: "inline-flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", height: "56px", padding: "8px 32px", borderRadius: "72px", border: "2px solid #979899" },
        ".pill-m-filled":  { display: "inline-flex", alignItems: "center", padding: "6px 24px", borderRadius: "50px", background: "#337DFF" },

        /* ---------- Icon + text ---------- */
        ".icon-100": { display: "block", width: "100px", height: "100px", flex: "0 0 auto" },
        ".icon-100 img": { display: "block", width: "100%", height: "100%" },
        ".icon-32": { display: "block", width: "32px", height: "32px", flex: "0 0 auto" },
        ".icon-32 img": { display: "block", width: "100%", height: "100%" },

        /* ---------- Table ---------- */
        ".tbl-row": { display: "flex", gap: "80px", alignItems: "flex-start", padding: "0 16px", width: "1823px" },
        ".tbl-cell": { flex: "1 1 0", minWidth: "0" },
        ".tbl-cell.head": { height: "23px" },
        ".tbl-cell.body": { display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "40px" },
      });
    },
  ],
};
