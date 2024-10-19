import { PersonController } from './person.controller';
import { PersonService } from './person.service';

describe(`${PersonController.name}`, () => {
  let controller: PersonController;

  const personsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    uploadPicture: jest.fn(),
  };

  beforeEach(() => {
    controller = new PersonController(personsServiceMock as any);
  });

  it(`should use #${PersonService.name} with correct params when route needs create a new person`, async () => {
    const argument = { key: 'value' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(personsServiceMock, 'create').mockResolvedValue(expected);

    const result = await controller.create(argument as any);

    expect(personsServiceMock.create).toHaveBeenCalledWith(argument);
    expect(result).toEqual(expected);
  });

  it(`should use #${PersonService.name} with correct params when route needs create a list all persons`, async () => {
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(personsServiceMock, 'findAll').mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(personsServiceMock.create).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it(`should use #${PersonService.name} with correct params when route needs find an especific person`, async () => {
    const argument = '1';
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(personsServiceMock, 'findOne').mockResolvedValue(expected);

    const result = await controller.findOne(argument as any);

    expect(personsServiceMock.findOne).toHaveBeenCalledWith(argument);
    expect(result).toEqual(expected);
  });

  it(`should use #${PersonService.name} with correct params when route needs updatej an especific person`, async () => {
    const argument1 = 1;
    const argument2 = { key: 'value' };
    const argument3 = { key: 'value' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(personsServiceMock, 'update').mockResolvedValue(expected);

    const result = await controller.update(
      argument1,
      argument2 as any,
      argument3 as any,
    );

    expect(personsServiceMock.update).toHaveBeenCalledWith(
      +argument1,
      argument2,
      argument3,
    );
    expect(result).toEqual(expected);
  });

  it(`should use #${PersonService.name} with correct params when route needs remove an especific person`, async () => {
    const argument1 = 1;
    const argument2 = { aKey: 'aValue' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(personsServiceMock, 'remove').mockResolvedValue(expected);

    const result = await controller.remove(argument1 as any, argument2 as any);

    expect(personsServiceMock.remove).toHaveBeenCalledWith(
      +argument1,
      argument2,
    );
    expect(result).toEqual(expected);
  });

  it(`should use #${PersonService.name} with correct params when route needs upload an especific file`, async () => {
    const argument1 = { aKey: 'aValue' };
    const argument2 = { bKey: 'bValue' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(personsServiceMock, 'uploadPicture').mockResolvedValue(expected);

    const result = await controller.uploadPicture(
      argument1 as any,
      argument2 as any,
    );

    expect(personsServiceMock.uploadPicture).toHaveBeenCalledWith(
      argument1,
      argument2,
    );
    expect(result).toEqual(expected);
  });
});
