import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components_auth/custom/theme-provider";
import "./globals-auth.css";

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content',  '${LIGHT_THEME_COLOR}' );
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

//Change to auto detect theme
//meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
//attribute="class"
//defaultTheme="system"
//enableSystem
//disableTransitionOnChange

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html
  className="light"
  lang="en"
  suppressHydrationWarning
>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: THEME_COLOR_SCRIPT,
      }}
    />
  </head>
  <body className="antialiased">
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Toaster position="top-center" />
      {children}

      <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>

      <div className="fixed bottom-4 right-4 flex items-end justify-end gap-2">
        <df-messenger
          location="europe-west2"
          project-id="keen-vision-437710-j9"
          agent-id="876b976b-e415-4fec-b4c8-fa38ff70d523"
          language-code="en"
          max-query-length="-1"
        >
          <df-messenger-chat-bubble chat-title="Chatbot Assistant"></df-messenger-chat-bubble>
        </df-messenger>
      </div>
    </ThemeProvider>
  </body>
</html>

  );
}
