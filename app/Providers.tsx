import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <div>{children}</div>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default Providers;
