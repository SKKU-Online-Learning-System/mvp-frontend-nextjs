import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  triggerName: string;
  components: { title: string; href: string; description: string }[];
};

export default function DemoNavMenuItem({ triggerName, components }: Props) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{triggerName}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]'>
          {components.map((component) => (
            <ListItem
              key={component.title}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/40 hover:text-accent-foreground focus:black/40 focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-lg font-bold leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-white'>
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
