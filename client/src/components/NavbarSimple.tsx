import { Text } from '@mantine/core';
import { IconClock, IconChartBar, IconBuildingStore, IconSettings, IconFolderOpen } from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const data = [
  { link: '/timer', label: 'Timer', icon: IconClock },
  { link: '/store', label: 'Store', icon: IconBuildingStore },
  { link: '/statistics', label: 'Stats', icon: IconChartBar },
  { link: '/projects', label: 'Projects', icon: IconFolderOpen }
];

const footerData = [
  { link: '/settings', label: 'Settings', icon: IconSettings }
];

export function NavbarSimple({ active, setActive }: NavbarProps) {
  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const footerLinks = footerData.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Text className={classes.header}>Paws</Text>
        {links}
      </div>

      <div className={classes.footer}>
        {footerLinks}
      </div>
    </nav>
  );
}