import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exception/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value); // Перетворення plain-об'єкта на клас
        const errors = await validate(obj); // Валідація об'єкта

        if (errors.length) {
            const messages = errors.map(err => `${err.property} - ${Object.values(err.constraints).join(', ')}`);
            throw new ValidationException(messages); 

        }
        
        return value; 

    }
}
