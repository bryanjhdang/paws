import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Text, Title, Button, Container } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { useEffect } from "react";
import classes from './HeroText.module.css';

// function LandingPage() {
//   const { loginWithRedirect, isAuthenticated } = useAuth0();   
//   const navigate = useNavigate();

//     // todo: some flicker in transition from Landing to Timer, may be inherent to current styling
//     useEffect(() => {
//         if (isAuthenticated) {
//             navigate('/timer');
//         } 
//     }, [isAuthenticated, navigate]);

//     const handleLogin = async () => {
//         await loginWithRedirect({
//             appState: {
//                 returnTo: "/timer",
//             },
//             authorizationParams: {
//                 prompt: "login",
//             },
//         });
//     };




export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // todo: some flicker in transition from Landing to Timer, may be inherent to current styling
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/timer');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/timer",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Gamified{' '}
          <Text component="span" className={classes.highlight} inherit>
            time tracking
          </Text>{' '}
          for all your needs. With cats.
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Use a simple and efficient time tracker that you'll love alongside your feline friends. Do some work, earn coins, and track your every move.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button 
            className={classes.control} 
            size="lg" 
            variant="default" 
            color="gray"
            leftSection={<IconBrandGithub size={20} />}
            onClick={() => window.open('https://github.com/bryanjhdang/tempify', '_blank')}
          >
            GitHub
          </Button>
          <Button 
            onClick={handleLogin} 
            className={classes.control} 
            size="lg" 
            color="#764b61"
          >
            Get started
          </Button>
        </div>
      </div>
    </Container>
  );
}