export class AlphaBeta {
  _alpha: number;
  _beta: number;

  constructor() {
    this._alpha = -Infinity;
    this._beta = Infinity;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(_alpha: number) {
    this._alpha = _alpha;
  }

  get beta() {
    return this._beta;
  }

  set beta(_beta: number) {
    this._beta = _beta;
  }
}
