import axios from 'axios';
import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
  return <h1>{currentUser ? "You are signed in" : " You aren't signed in"}</h1>;
}

Index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/currentuser');
  return data;
}

export default Index;