import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/forum/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'
import { HashCompare } from '@/domain/forum/cryptography/hash-compare'
import { BcryptHasher } from './bcrypt-hasher'
import { HashGenerator } from '@/domain/forum/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashCompare,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptographyModule {}
