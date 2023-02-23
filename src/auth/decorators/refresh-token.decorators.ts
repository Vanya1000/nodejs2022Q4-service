import { SetMetadata } from '@nestjs/common';

export const REFRESH_TOKEN = 'refreshToken';

export const RefreshTokenCanBe = () => SetMetadata(REFRESH_TOKEN, true);
