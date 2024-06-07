import { NavigationProp, NavigationState } from '@react-navigation/native';
import { useEffect } from 'react';

import useAppService from 'controllers/app/service';

type Props = {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
};

const RedirectHandler: React.FC<Props> = ({ navigation }: any) => {
  const { redirect, clearRedirect } = useAppService();

  useEffect(() => {
    if (redirect) {
      navigation.navigate(redirect);
      clearRedirect();
    }
  }, [redirect, navigation]);

  return null;
};

export default RedirectHandler;
