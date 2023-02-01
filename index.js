var taskInput = document.getElementById('newItem');
var addTaskButton = document.getElementById('addItemButton');
var incompleteTasks = document.getElementById('toDo');
var completedTask = document.getElementById('completedTasks');

const MAGIC_NUMBER = 17;

var data = `{
  "name": "דברים",
  "content": [
    {
      "name": "חפצים",
      "content": [
        {
          "name": "חפצים ישנים",
          "content": [
            {
              "name": "חפצים ישנים של סבתא שלי",
              "content": [
                {
                  "name": "טבעות שאמא שלי כבר לא לובשת אף פעם"
                }
              ]
            },
            {
              "name": "חפצים ישנים שנהיים צהובים",
              "content": [
                {
                  "name": "$יש את כל המקלדות הישנות האלה שהן עכשיו צהובות. גם הכיסוי לאייפון שלי היה פעם שקוף ועכשיו הוא צהוב. לגמרי",
                  "content": []
                }
              ]
            },
            {
              "name": "כאלה שכבר לא מייצרים יותר",
              "content": []
            },
            {
              "name": "ישנים אבל שעדיין מייצרים אותם בדיוק כמו פעם",
              "content": []
            }
          ]
        },
        {
          "name": "חפצים ענקיים שאי אפשר להכניס הביתה",
          "content": [
            {
              "name": "צעצועים פרוותיים שחברה שלך נותנת לך בכיתה ד'",
              "content": []
            },
            {
              "name": "ספות גדולות",
              "content": []
            },
            {
              "name": "מדפסת ענקית ממש",
              "content": []
            },
            {
              "name": "מכוניות",
              "content": []
            }
          ]
        },
        {
          "name": "חפצים שיש מהם רק אחד",
          "content": [
            {
              "name": "יצירות אומנות חד פעמיות",
              "content": []
            },
            {
              "name": "דברים שיש להם פאק מיוחד מהפס ייצור",
              "content": []
            },
            {
              "name": "הדפסים",
              "content": []
            },
            {
              "name": "",
              "content": []
            }
          ]
        },
        {
          "name": "חפצים שיש במגירה בבית",
          "content": []
        }
      ]
    },
    {
      "name": "חיות",
      "content": [
        {
          "name": "פרות",
          "content": []
        },
        {
          "name": "אריות",
          "content": []
        },
        {
          "name": "חיות גדולות",
          "content": []
        },
        {
          "name": "חיות מפחידות",
          "content": []
        },
        {
          "name": "חיות שראיתי בדרום אמריקה",
          "content": []
        },
        {
          "name": "חיות שקשה לצלם",
          "content": []
        }
      ]
    },
    {
      "name": "מכשירים אלקטרוניים",
      "content": [
        {
          "name": "מכשירים עם מסך",
          "content": []
        },
        {
          "name": "דברים שצופים בהם",
          "content": []
        },
        {
          "name": "מכשירים שעוזרים להכין אוכל או לשנות לו את הטמפרטורה",
          "content": []
        },
        {
          "name": "מכשירים שעושים מסאז'",
          "content": []
        }
      ]
    },
    {
      "name": "כלי תחבורה",
      "content": [
        {
          "name": "כלים שמיועדים לבן אדם אחד",
          "content": []
        },
        {
          "name": "אטובוסים",
          "content": []
        },
        {
          "name": "דברים שאפשר להגיע איתם מהר לעבודה",
          "content": []
        },
        {
          "name": "כלים שיש לי",
          "content": []
        },
        {
          "name": "כלים שקל למות אם משתמשים בהם",
          "content": []
        }
      ]
    },
    {
      "name": "סוגים של מדע",
      "content": [
        {
          "name": "מתמטיקה",
          "content": []
        },
        {
          "name": "ביולוגיה",
          "content": []
        },
        {
          "name": "כימיה",
          "content": []
        },
        {
          "name": "מדע כדור הארץ",
          "content": []
        },
        {
          "name": "מדעי המחשב",
          "content": []
        }
      ]
    },
    {
      "name": "איברים בגוף",
      "content": [
        {
          "name": "איברים פנימיים",
          "content": []
        },
        {
          "name": "איברים שמנגנים איתם",
          "content": []
        },
        {
          "name": "איברים שאפשר לשבור",
          "content": []
        },
        {
          "name": "איברים שקשורים לאהבה או שאיתם נותנים אהבה",
          "content": []
        },
        {
          "name": "איברים ששברתי",
          "content": []
        }
      ]
    }
  ]
}
`

var data2 = `{
    "name": "דברים",
    "content": [
      {
        "name": "חיות",
        "content": [
          {
            "name": "יונקים",
            "content": [
              {
                "name": "יונקים שגם עפים",
                "content": [
                  {
                    "name": "עטלפים",
                    "content": [
                      { "name": "עטלפים בתל אביב", "content": [] },
                      { "name": "דברים שעטלפים אוכלים", "content": [] },
                      { "name": "צלילים שעטלפים יכולים לשמוע", "content": [] }
                    ]
                  },
                  {
                    "name": "יונקים מאוסטרליה",
                    "content": [
                      { "name": "גורים של קנגורו", "content": [] },
                      { "name": "וומבטים", "content": [] },
                      {
                        "name": "דברים",
                        "content": [
                          {
                            "name": "דברים",
                            "content": [
                              {
                                "name": "דברים",
                                "content": [
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] }
                                ]
                              },
                              {
                                "name": "דברים",
                                "content": [
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] }
                                ]
                              }
                            ]
                          },
                          {}
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "יונקים שגם במים",
                "content": []
              },
              {
                "name": "אנשים",
                "content": [{
                  "name":"אנשים שזרקו אותי",
                  "content": [
                      {
                          
                      }
                  ]
                }]
              }
            ]
          },
          {
            "name": "חיות גדולות",
            "content": [
              {
                "name": "דברים",
                "content": [
                  {
                    "name": "דברים",
                    "content": [
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] }
                    ]
                  },
                  {
                    "name": "דברים",
                    "content": [
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] }
                    ]
                  }
                ]
              },
              {}
            ]
          },
          { "name": "חיות מפחידות", "content": [] }
        ]
      },
      {
        "name": "כלי תחבורה",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },
      {
        "name": "אנשים מפורסמים",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },
      {
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },{
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      }
    ]
  }
  `

let NUM_DOTS = 12;
let FADE_FACTOR = .8;

let dots = [];
let mouse = {
  x: 0,
  y: 0
};

var Dot = function () {
  this.x = 0;
  this.y = 0;
  this.node = (function () {
    let n = document.createElement(`div`);
    n.className = `trail`;
    document.body.appendChild(n);
    return n;
  }());
};

Dot.prototype.draw = function () {
  this.node.style.left = `${this.x}px`;
  this.node.style.top = `${this.y}px`;
};


function initDrawing() {

  for (const i of Array(NUM_DOTS).keys()) {
    let d = new Dot();
    dots.push(d);
  }


  addEventListener(`mousemove`, function (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  });


}
function draw() {
  let lastX = dots.pe
  // console.log(`Drawing...`);
  let x = mouse.x;
  let y = mouse.y;
  // console.log(`x: ${x}, y: ${y}...`);
  dots.forEach(function (dot, index, dots) {
    let nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * FADE_FACTOR;
    y += (nextDot.y - dot.y) * FADE_FACTOR;
  });
}

function animate() {
  // console.log(`Animating...`);
  draw();
  requestAnimationFrame(animate);
}

let addItem = function () {
  var text = taskInput.value;
  var li = document.createElement('li');
  li.innerHTML = text;
  incompleteTasks.appendChild(li);
}

var listDivId = 'mainThingsList';
var listDivElem = document.getElementById(listDivId);

var lastPressed = -1;


function setAsSelected(element) {
  element.classList.add('selected');
  element.children[0].setAttribute('anchor', "▾");
  
  // element.style.display = 'inline-block';
}

function removeAsSelected(element) {
  element.classList.remove('selected');
  element.style.display = 'block';
  element.children[0].setAttribute('anchor', ">");

}


function setBodyOnClick() {
  document.body.addEventListener('click', function (e) {
    console.debug(lastPressed);
    console.debug(`'entered outside`);
    if (lastPressed != -1) {
      console.debug(`'entered inside`);
      removeAsSelected(lastPressed);
      lastPressed = -1;
    }
  })
}

function setLiOnClick(clicked, elem, content) {
  clicked.addEventListener('click', function (e) {

    if (lastPressed != -1) {
      removeAsSelected(lastPressed);
    }
    console.debug('/n');
    console.debug(`last pressed: ${lastPressed}`);
    console.debug(`clicked: ${clicked}`);
    if (lastPressed != elem || content.style.display == 'none') {
      setAsSelected(elem);
      // e.currentTarget.style.color = 'red';
    }
    lastPressed = elem;
    content.style.display = (getComputedStyle(content).display == 'none') ? 'block' : 'none';
    // for (let child of content.children) {
    // child.classList.add('selected');
    // child.style.color = 'red';

    // alert(e.currentTarget.textContent);
    // }
    e.stopPropagation();
  });

}

function initJsonObj(prevElem, jObj) {
  // console.debug('\n');
  if ('name' in jObj) {

    let listItem = prevElem.appendChild(document.createElement(`li`));
    let itemName = listItem.appendChild(document.createElement(`h2`));
  itemName.setAttribute('anchor', ">");

    // itemName.style.top = `${prevElem.style.top + 25}px`;
    let prevItemName = prevElem.parentElement.children[0];
    if (window.getComputedStyle(prevItemName).getPropertyValue(`top`) == 'auto') {
      itemName.style.top = `0px`;
      itemName.style.zIndex = 9999999;
      
    } else {
      itemName.style.top = `${parseInt(window.getComputedStyle(prevItemName).getPropertyValue(`top`)) + MAGIC_NUMBER}px`;
      itemName.style.zIndex = parseInt(window.getComputedStyle(prevItemName).getPropertyValue('z-index')) - 1;

    }
    if (jObj["name"].startsWith('$')) {
      itemName.textContent = jObj["name"].substring(1);
      itemName.classList.add('thought');
    } else {
      itemName.textContent = jObj["name"];

    }

    let itemContent = listItem.appendChild(document.createElement('ul'));
    setLiOnClick(itemName, listItem, itemContent);

    // Init input
    // let inputDiv = document.createElement(`li`);

    // wage.addEventListener("keydown", function (e) {
    //     if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    //         validate(e);
    //     }
    // });

    // function validate(e) {
    //     var text = e.target.value;
    //     //validation of the input...
    // }

    appendEmptyInput(itemContent);

    // let inputSpan = itemContent.appendChild(document.createElement(`span`));
    // inputSpan.classList.add('input-span');
    // let inputDiv = inputSpan.appendChild(document.createElement(`input`));
    // inputDiv.addEventListener("keydown", function (e) {
    //   if (e.key === "Enter") {
    //     let childLi = prependEmptyChild(itemContent, e.target.value, true);
    //     inputDiv.value = "";
    //     // let newLi = itemContent.appendChild(document.createElement(`li`));
    //     // newLi.textContent = "just added this";
    //     // inputDiv.style.backgroundColor = "red";
    //   }
    // });

    if ('content' in jObj) {
      for (let item of jObj["content"]) {
        initJsonObj(itemContent, item);
      }

    }

  }

}

function appendAsSecond(parent, child) {
  parent.insertBefore(child, parent.children[1]);
  return child;
}

function prependChild(parent, child) {
  parent.prepend(child);
  return child;
}

function appendEmptyInput(parent) {
  let inputSpan = parent.appendChild(document.createElement(`span`));
  inputSpan.classList.add('input-span');
  let inputDiv = inputSpan.appendChild(document.createElement(`input`));
  inputSpan.setAttribute('anchor', ">");

  inputDiv.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let childLi;
      if (e.target.value.startsWith('$')) {
        childLi = prependEmptyChild(parent, e.target.value.substring(1), true);
        let childH2 = childLi.children[0]; 
        childH2.setAttribute('anchor', '$');
        childH2.classList.add('thought');
        // childH2.style.fontFamily = 'VcDavid';
        // childH2.style.fontWeight= 700;
      } else {
        childLi = prependEmptyChild(parent, e.target.value, true);
        
      }
      inputDiv.value = "";
      // let newLi = itemContent.appendChild(document.createElement(`li`));
      // newLi.textContent = "just added this";
      // inputDiv.style.backgroundColor = "red";
    }
  });
}

const ITEM_CONTENT_INDEX = 1;
function prependEmptyChild(parent, childTextContent, shouldInsertAsSecond) {
  // let itemContent = parent.children[ITEM_CONTENT_INDEX];
  let childLi;
  if (shouldInsertAsSecond) {
    childLi = appendAsSecond(parent, document.createElement('li'));
  } else {
    childLi = prependChild(parent, document.createElement('li'));
  }
  let childH2 = childLi.appendChild(document.createElement('h2'));
  childH2.setAttribute('anchor', ">");

  childH2.textContent = childTextContent;
  let childItemContent = childLi.appendChild(document.createElement('ul'));
  let emptyInput = appendEmptyInput(childItemContent);
  setLiOnClick(childH2, childLi, childItemContent);

  return childLi;
  // let childItemContent =  
}

function initElements() {
  let jsonObj = JSON.parse(data);

  setBodyOnClick();
  initJsonObj(listDivElem, jsonObj);
}




function main() {
  // initDrawing();
  // animate();
  initElements();

}

main();