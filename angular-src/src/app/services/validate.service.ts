import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
  constructor() {}

  validateRegister(user) {
    if (
      user.userType === undefined ||
      user.username === undefined ||
      user.name === undefined ||
      user.email === undefined ||
      user.password === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePuzzels(puzzle) {

    if (puzzle.puzzle1 === undefined || puzzle.puzzle2 === undefined) {
        return false;
    }

    if (puzzle.puzzle1 === null || puzzle.puzzle2 === null) {
        return false;
    }

    if (puzzle.puzzle1 === '' || puzzle.puzzle2 === '') {
        return false;
    }

    return true;
  }

  validatePuzzelOne(puzzle) {
    if (puzzle.puzzle1 > 7 || puzzle.puzzle1 < 0) {
        return false;
    }
    return true;
  }
}
