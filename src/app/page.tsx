import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center gap-12 py-16 px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            shadcn/ui Design System
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Primitive components built with Radix UI and styled with Tailwind
            CSS variables. All components automatically adapt to light and dark
            themes.
          </p>
        </div>

        {/* Button Variants Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Button Components</CardTitle>
              <CardDescription>
                Different button variants using our design tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
            <CardFooter className="border-t">
              <p className="text-sm text-muted-foreground">
                All variants automatically adapt to the current theme
              </p>
            </CardFooter>
          </Card>
        </section>

        {/* Button Sizes Section */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
              <CardDescription>
                Different button sizes for various use cases
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </CardContent>
          </Card>
        </section>

        {/* Card Composition Section */}
        <section className="w-full max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Light Theme</CardTitle>
                <CardDescription>
                  This card uses CSS variables that automatically map to light
                  theme tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Background uses <code className="text-xs">--card</code>,
                  text uses <code className="text-xs">--card-foreground</code>
                </p>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dark Theme</CardTitle>
                <CardDescription>
                  Switch to dark mode to see automatic color adaptation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All colors defined in{" "}
                  <code className="text-xs">globals.css</code> using oklch
                  color space
                </p>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Design System Features</CardTitle>
              <CardDescription>
                Built with modern primitives and best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2 rounded-lg border p-4">
                <h3 className="font-semibold">Accessible</h3>
                <p className="text-sm text-muted-foreground">
                  Built on Radix UI primitives with ARIA compliance
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4">
                <h3 className="font-semibold">Themeable</h3>
                <p className="text-sm text-muted-foreground">
                  CSS variables with oklch color space for smooth transitions
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4">
                <h3 className="font-semibold">Composable</h3>
                <p className="text-sm text-muted-foreground">
                  Mix and match components to build complex interfaces
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button asChild variant="default" size="lg">
            <a href="/demo/viz">View Visualizations</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/demo/ai">Try AI Chat</a>
          </Button>
        </section>
      </main>
    </div>
  );
}
