import type { User } from '$types';
import { Timestamp } from 'firebase/firestore';

export const userMapper = ({
  uid,
  providerId,
  displayName,
  email,
  phoneNumber,
  photoURL,
  role,
  emailVerified,
  status,
  createdAt,
}: Partial<User>) => {
  const required = displayName?.length && email?.length && phoneNumber?.length;

  const defaults = {
    role: role || 'volunteer',
    status: status
      ? status === 'pending' && required
        ? 'active'
        : status
      : required
      ? 'active'
      : 'pending',
    photoURL:
      photoURL ||
      (displayName
        ? encodeURI(
            `https://avatars.dicebear.com/api/initials/${displayName}.svg`
          )
        : null),
    createdAt: createdAt || Timestamp.now(),
    loginAt: Timestamp.now(),
  };

  return {
    ...defaults,
    uid,
    providerId,
    displayName,
    email,
    phoneNumber,
    emailVerified,
  };
};
