// Define all dummy data
const dummyData = {} // rename as you like

// Define all types
import React from 'react'

type SignInFormProps = {}

type SignInFormState = {
  email: string;
  password: string;
  rememberMe: boolean;
}

type SignInFormEventHandlers = {
  handleEmailChange: (email: string) => void;
  handlePasswordChange: (password: string) => void;
  handleRememberMeChange: (rememberMe: boolean) => void;
  handleSignIn: () => void;
}

// import required hooks, icons

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleEmailChange = (email: string) => {
    setEmail(email);
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  }

  const handleRememberMeChange = (rememberMe: boolean) => {
    setRememberMe(rememberMe);
  }

  const handleSignIn = () => {
    // Handle sign in logic
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="mb-4">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => handleRememberMeChange(e.target.checked)}
            />
            <span className="text-sm">
              Remember me
            </span>
          </div>
          <div className="text-sm">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm">
            Don't have an account? 
          </span>
          <a className="text-blue-500 hover:text-blue-800 ml-1" href="#">
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
}

const OuterComponent: React.FC<SignInFormProps> = (props) => {
  return <SignInForm />;
}

export default OuterComponent;