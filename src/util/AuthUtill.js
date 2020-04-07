import { useSelector } from 'react-redux';

const AuthUtill = (a) => {
  const accessToken = useSelector(state => state.startReducer.accessToken, '');
  console.log(3, a)
  return {
    accessToken
  }
}

export default AuthUtill;
