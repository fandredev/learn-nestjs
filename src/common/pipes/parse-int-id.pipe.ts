import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export default class ParseIntIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(metadata, 'metadata');
    console.log(value, 'value');

    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = +value;

    if (isNaN(parsedValue))
      throw new BadRequestException('ParseIntIdPipe needs a string number');

    if (parsedValue < 0)
      throw new BadRequestException(
        'ParseIntIdPipe needs a number greather than zero',
      );

    return parsedValue;
  }
}
