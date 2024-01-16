import { useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAvatar } from 'reduxs/global-actions';
import { generateAvatarBG } from 'utils';
import { Avatars } from 'reduxs/global-reducers/LeaderBoard';
import { lightColors } from 'styles';

/**
 * useUserAvatarColor hook is used to get the avatar color of a user from local storage.
 * If the user does not have an avatar color, it will generate a new one and save it to local storage.
 *
 * @param username The username of the user.
 * @returns The avatar color of the user.
 *
 * @example
 * const avatarColor = useUserAvatarColor('username');
 */
export default function useUserAvatarColor(username?: string): string {
  const dispatch = useDispatch();
  const avatarColor = useAppSelector(state => state.usersAvatar[username ?? '-']);

  useEffect(() => {
    if (!avatarColor) {
      dispatch(
        addAvatar({
          [username ?? '-']: generateAvatarBG(),
        })
      );
    }
  }, [avatarColor]);

  return avatarColor ?? lightColors.WHITE;
}

export function useUsersAvatarColor(usernames?: string[]): Avatars {
  const dispatch = useDispatch();
  const avatarColor = useAppSelector(state => state.usersAvatar);

  useEffect(() => {
    const newAvatars: Avatars = {};
    usernames?.forEach(username => {
      if (!avatarColor[username]) {
        newAvatars[username] = generateAvatarBG();
      }
    });
    if (Object.keys(newAvatars).length > 0) {
      dispatch(addAvatar(newAvatars));
    }
  }, [usernames]);

  return avatarColor;
}
