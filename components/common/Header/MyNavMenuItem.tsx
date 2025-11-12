import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  Style,
} from '@/components/ui/navigation-menu';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  style: 'black' | 'white';
  triggerName: string;
  components: { title: string; href: string; description: string }[];
};

export default function MyNavMenuItem({
  style,
  triggerName,
  components,
}: Props) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger style={style}>{triggerName}</NavigationMenuTrigger>
      <NavigationMenuContent style={style}>
        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]'>
          {components.map((component) => (
            <ListItem
              key={component.title}
              style={style}
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

const ListItem = forwardRef<
  ElementRef<'a'>,
  ComponentPropsWithoutRef<'a'> & Style
>(({ style, className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink style={style} asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:text-accent-foreground',
            style === 'white'
              ? 'hover:bg-accent focus:bg-accent'
              : 'hover:bg-black/40 focus:black/40',
            className
          )}
          {...props}
        >
          <div className='text-lg font-bold leading-none'>{title}</div>
          <p
            className={`line-clamp-2 text-sm leading-snug ${style === 'white' ? 'text-black' : 'text-white'}`}
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
