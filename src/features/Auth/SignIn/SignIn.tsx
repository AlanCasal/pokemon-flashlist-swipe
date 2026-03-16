import { SignIn } from '@components/clerk/SignIn';

const SignInScreen = () => (
	<SignIn
		homeUrl='/pokedex'
		scheme='pokemon-flashlist-swipe'
		signUpUrl='/sign-up'
	/>
);

export default SignInScreen;
