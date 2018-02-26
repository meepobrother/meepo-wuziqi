import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  width = 0;
  height = 0;
  // 棋盘
  n = 15;
  ny = 15;
  // 默认黑棋先下
  color: string = 'black';
  // 存储棋盘的数据
  gobangArr: any[] = [];
  // 棋子赢的数组
  win: boolean = false;
  // 棋盘
  gobang: ElementRef;
  // 下棋状态
  gobangStatus: ElementRef;
  // 再来一盘
  gobangToolAgain: ElementRef;
  ngOnInit() {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.ny = Math.floor(this.height / (this.width/ 15));
    this.resetGobang();
  }

  // 重置数据，再来一盘
  resetGobang() {
    var i, j;
    // 清除数组数据
    for (i = 0; i < this.ny; i++) {
      var tempData = [];
      for (j = 0; j < this.n; j++) {
        tempData.push('');
      }
      this.gobangArr[i] = tempData;
    }
  }

  setItem(item: any, i, j) {
    item = this.color;
    if (this.color === 'black') {
      this.color = 'white';
    } else {
      this.color = 'black';
    }
    this.gobangArr[i][j] = this.color;
    this.chessWin(i, j, this.color);
  }

  chessWin(i, j, color) {
    var row, col,
      count = 1;  // 连续同一个颜色棋子的个数
    // 垂直方向
    for (row = i - 1; row >= 0 && row > i - 5; row--) {
      if (this.gobangArr[row] && this.gobangArr[row][j] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    for (row = i + 1; row < this.n && row < i + 5; row++) {
      if (this.gobangArr[row] && this.gobangArr[row][j] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    count = 1;
    // 水平方向
    for (col = j - 1; col >= 0 && col > j - 5; col--) {
      if (this.gobangArr[i] && this.gobangArr[i][col] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    for (col = j + 1; col < this.n && col < j + 5; col++) {
      if (this.gobangArr[i] && this.gobangArr[i][col] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    count = 1;
    // 45°方向
    for (row = i - 1, col = j - 1; row >= 0 && col >= 0 && row > i - 5 && col > j - 5; row-- , col--) {
      if (this.gobangArr[row] && this.gobangArr[row][col] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    for (row = i + 1, col = j + 1; row < this.n && col < this.n && row < i + 5 && col < j + 5; row++ , col++) {
      if (this.gobangArr[row] && this.gobangArr[row][col] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    count = 1;
    // 135°方向
    for (row = i - 1, col = j + 1; row >= 0 && col < this.n && row > i - 5 && col < j + 5; row-- , col++) {
      if (this.gobangArr[row] && this.gobangArr[row][col] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    for (row = i + 1, col = j - 1; row < this.n && col >= 0 && row < i + 5 && col > j - 5; row++ , col--) {
      if (this.gobangArr[row] && this.gobangArr[row][col] == color) {
        count++;
        this.ifWin(count, color);
      } else {
        break;
      }
    }
    count = 1;
  }

  ifWin(count, color) {
    if (count == 5) {
      if (color == "black") {
        console.log('黑棋赢了');
      } else {
        console.log('白棋赢了');
      }
      this.win = true;
    } else {
      this.win = false;
    }
  }
}
