import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NavigationMenuDemo } from './DemoNav';
import { LoginButton } from './LoginButton';
import Logo from './Logo';
import { LogoutButton } from './LogoutButton';

type Props = {
  refreshToken?: RequestCookie;
  style?: 'black' | 'white';
};

export default function Nav({ refreshToken, style = 'black' }: Props) {
  return (
    <nav
      className={`flex w-full h-16 ${style == 'white' ? 'bg-white shadow-xl' : 'bg-black/40'} fixed justify-between items-center px-6`}
    >
      <Logo />
      <NavigationMenuDemo style={style} />
      {refreshToken ? (
        <LogoutButton style={style} />
      ) : (
        <LoginButton style={style} />
      )}
    </nav>
  );
}
