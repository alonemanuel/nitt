import {
  getDatabase,
  set,
  get,
  push,
  update,
  remove,
  onValue,
  limitToLast,
  onChildAdded, onChildChanged,
  // addValueEventListener,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
var taskInput = document.getElementById('newItem');
var addTaskButton = document.getElementById('addItemButton');
var incompleteTasks = document.getElementById('toDo');
var completedTask = document.getElementById('completedTasks');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGhnWGi6psDgrzCT9yWfta6fKBwZ4e_e4",
  authDomain: "nitt-376310.firebaseapp.com",
  databaseURL: "https://nitt-376310-default-rtdb.firebaseio.com",
  projectId: "nitt-376310",
  storageBucket: "nitt-376310.appspot.com",
  messagingSenderId: "219247578055",
  appId: "1:219247578055:web:1dedc363f6adeb4408e7e2",
  measurementId: "G-1YXGG007QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
                  "name": "יש את כל המקלדות הישנות האלה שהן עכשיו צהובות. גם הכיסוי לאייפון שלי היה פעם שקוף ועכשיו הוא צהוב. לגמרי",
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
              "name": "פסלים שיש בצמתים, פסלי זיכרון",
              "content": [
                {
                  "name": "&יש בכרכור איזה פסל כזה לזכר השואה, משהו שחור אבל הוא נראה קצת כמו קקי",
                  "content": []
                }
              ]
            }
          ]
        },
        {
          "name": "חפצים שיש במגירה בבית",
          "content": [
            {
              "name": "תמונות של ההורים כשהם היו קטנים",
              "content": []
            },
            {
              "name": "תחתיות לכוסות מחוץ לארץ",
              "content": []
            },
            {
              "name": "מטענים ישנים לטלפונים ישנים",
              "content": []
            },
            {
              "name": "סוללות שלא עובדות",
              "content": []
            }
          ]
        }
      ]
    },
    {
      "name": "חיות",
      "content": [
        {
          "name": "פרות",
          "content": [
            {
              "name": "פרות הולנדיות בצבע זהב",
              "content": []
            },
            {
              "name": "פרות שיש על הקרטון של החלב",
              "content": []
            },
            {
              "name": "פרות שלפעמים רואים בצד של הכביש כשנוסעים לצפון",
              "content": []
            }
          ]
        },
        {
          "name": "אריות",
          "content": [
            {
              "name": "אריות ממלך האריות",
              "content": []
            },
            {
              "name": "אריות בגן חיות",
              "content": []
            },
            {
              "name": "אנשים שהם מזל אריה",
              "content": []
            }
          ]
        },
        {
          "name": "חיות גדולות",
          "content": [
            {
              "name": "פילים",
              "content": []
            },
            {
              "name": "לוויתנים",
              "content": []
            },
            {
              "name": "כלבים ענקיים",
              "content": [
                {
                  "name": "כלבים ענקיים ליד הבית קפה על בן גוריון",
                  "content": []
                },
                {
                  "name": "כלבים של עוקץ שמריחים סמים",
                  "content": []
                },
                {
                  "name": "כלבים גרוזיניים מהטיול",
                  "content": []
                },
                {
                  "name": "כלבים רומניים",
                  "content": []
                }
              ]
            }
          ]
        },
        {
          "name": "חיות מפחידות",
          "content": [
            {
              "name": "החיה שנהמה עלינו ביער ליד אבו גוש",
              "content": [
                {
                  "name": "&שמענו רעש חזק וזה התקרב אלינו, זה היה בלילה בחלקת יער שנקראת יער אינשטיין ליד החניון של המסעדה הלבנונית. התקשרנו למשטרה והמוקדנית אמרה שאין לה מה לעשות עם זה",
                  "content": []
                }
              ]
            },
            {
              "name": "כלבים מפחידים בכפרים בדואים",
              "content": []
            },
            {
              "name": "ברווזים",
              "content": []
            }
          ]
        },
        {
          "name": "חיות שראיתי בדרום אמריקה",
          "content": [
            {
              "name": "צבי ים",
              "content": []
            },
            {
              "name": "כלבים משוטטים ברחוב",
              "content": []
            }
          ]
        },
        {
          "name": "חיות שקשה לצלם",
          "content": [
            {
              "name": "חרקים שמתחבאים בסדקים",
              "content": []
            },
            {
              "name": "&קניתי מצלמה וחשבתי שאני אצלם איתה חיות וחרקים ולא צילמתי כלום והיא סתם במגירה",
              "content": []
            },
            {
              "name": "חיות שיש להן מחילה",
              "content": []
            },
            {
              "name": "חיות שיש מעט מהן בארץ",
              "content": []
            },
            {
              "name": "חיות שתמיד רחוקות ממך",
              "content": []
            }
          ]
        }
      ]
    },
    {
      "name": "&יש כל מיני דברים... לא יודע איך לחלק את זה",
      "content": [
        {
          "name": "&איך מחלקים לתתי קטגוריות? מה הדבר הראשון?",
          "content": []
        },
        {
          "name": "&יש דברים אמיתיים בעולם כמו חפצים וחיות ויש דברים כמו רעיונות וכאלה שאי אפשר לשים עליהם את האצבע, זה יותר מחשבתי",
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
          "content": [
            {
              "name": "מיקרוגלים",
              "content": [
                {
                  "name": "מיקרוגלים שעובדים טוב ומחממים",
                  "content": []
                },
                {
                  "name": "מיקרוגלים שלא מחממים",
                  "content": [
                    {
                      "name": "מיקרוגלים בעבודה שלי",
                      "content": []
                    }
                  ]
                }
              ]
            },
            {
              "name": "תנורים",
              "content": []
            }
          ]
        },
        {
          "name": "מכשירים שעושים מסאז'",
          "content": [
            {
              "name": "כורסאות מסאז'",
              "content": [
                {
                  "name": "כורסאות מסאז' בבית של ההורים של חברה שלי",
                  "content": [
                    {
                      "name": "&יש להורים של חברה שלי כורסא (אפשר גם כורסה?) מטורפת שמדברים איתה. אומרים לה   הלו לוסי' והיא עונה ועושה מסאז'",
                      "content": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "כלי תחבורה",
      "content": [
        {
          "name": "כלים שמיועדים לבן אדם אחד",
          "content": [
            {
              "name": "אופניים",
              "content": [
                {
                  "name": "אופניים שגנבו לי",
                  "content": [
                    {
                      "name": "אופניים שהיו לי בירושלים",
                      "content": [
                        {
                          "name": "אופניים שלא נעלתי טוב",
                          "content": [
                            {
                              "name": "אופניים שקשרתי למעקה שלא היה מחובר לרצפה",
                              "content": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "אופניים שהיו לי בהולנד",
                      "content": [
                        {
                          "name": "האופניים הראשונות שקניתי מהמרקטפלייס והשארתי ליד התחנה המרכזית",
                          "content": [
                            {
                              "name": "&עשיתי ניסוי שבו השארתי את האופניים לא נעולות. החזקתי ככה חודש חודשיים ודווקא כשהתלהבתי וסיפרתי על הניסוי ראיתי שגנבו לי.",
                              "content": []
                            }
                          ]
                        },
                        {
                          "name": "האופניים השניות שקניתי מהומלס והשארתי ליד הבצפר",
                          "content": [
                            {
                              "name": "&יש סיכוי שההומלס עצמו גנב אותם אחרי שהוא מכר לי אותם",
                              "content": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "name": "קורקינטים",
              "content": [
                {
                  "name": "קורקינטים לילדים קטנים",
                  "content": [
                    {
                      "name": "&פעם רכבתי עם יונתן ברקת על אותו קורקינט והתרסקנו בירידה של תלתן, הייתי כולי שפשופים",
                      "content": []
                    }
                  ]
                },
                {
                  "name": "קורקינטים חשמליים לערסים",
                  "content": []
                }
              ]
            }
          ]
        },
        {
          "name": "אוטובוסים",
          "content": [
            {
              "name": "אוטובוסים ארוכים מתקפלים (אקורדיון)",
              "content": []
            },
            {
              "name": "מיניבוסים רגילים",
              "content": [
                {
                  "name": "מיניבוסים שלוקחים לחתונה",
                  "content": []
                },
                {
                  "name": "מיניבוסים שלוקחים לבת מצווה",
                  "content": []
                }
              ]
            },
            {
              "name": "אוטובוסים שהם לא מיניבוס הם רק קצרים יותר",
              "content": []
            },
            {
              "name": "אוטובוסים של תגלית",
              "content": []
            }
          ]
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
          "name": "כלים שקל למות מהם אם משתמשים בהם",
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
          "content": [
            {
              "name": "אצבעות",
              "content": [
                {
                  "name": "&אפשר לנגן על גיטרה עם האצבעות",
                  "content": []
                }
              ]
            }
          ]
        },
        {
          "name": "איברים שאפשר לשבור",
          "content": []
        },
        {
          "name": "איברים שקשורים לאהבה או שאיתם נותנים אהבה",
          "content": [
            {
              "name": "איברים אוהבים בפנים",
              "content": [
                {
                  "name": "איברים רטובים על הפנים שאוהבים איתם",
                  "content": [
                    {
                      "name": "פה",
                      "content": []
                    },
                    {
                      "name": "לשון",
                      "content": [
                        {
                          "name": "&לא ידעתי איך מנשקים עם לשון וסתם הייתי מלקק את הלמעלה של הפה",
                          "content": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "איברים יבשים בפנים שאוהבים איתם",
                  "content": [
                    {
                      "name": "אוזניים",
                      "content": []
                    }
                  ]
                }
              ]
            },
            {
              "name": "איזורים מוצנעים",
              "content": []
            }
          ]
        },
        {
          "name": "איברים ששברתי",
          "content": [
            {
              "name": "&שברתי את האצבע כשזרקו עלי כדור פוטבול וניסיתי לתפוס ביד אחת",
              "content": []
            }
          ]
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
    // console.debug(lastPressed);
    // console.debug(`'entered outside`);
    if (lastPressed != -1) {
      // console.debug(`'entered inside`);
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
    // console.debug('\n');
    // console.debug(`last pressed: ${lastPressed}`);
    // console.debug(`clicked: ${clicked}`);
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
    if (jObj["name"].startsWith('&')) {
      itemName.textContent = jObj["name"].substring(1);
      itemName.classList.add('thought');
    } else {
      itemName.textContent = jObj["name"];

    }

    let itemContent = listItem.appendChild(document.createElement('ul'));
    setLiOnClick(itemName, listItem, itemContent);


    let db = getDatabase();
    // console.debug('rrrrrrrrrrr');
    appendEmptyInput(itemContent, 'things', 'Lorem');


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
function isInputValid(inputText) {
  let notEmpty = inputText.replace(/[  ]/g, '').length > 0;
  let isMalicious = (inputText.toLowerCase().includes("table"));
  return notEmpty && !isMalicious;
}

function appendEmptyInput(parent, parentPath, parentText) {
  let inputSpan = parent.appendChild(document.createElement(`span`));
  inputSpan.classList.add('input-span');
  let inputDiv = inputSpan.appendChild(document.createElement(`div`));
  inputDiv.classList.add('input');
  inputDiv.contentEditable = 'true';
  // let charCount = inputDiv.appendChild(document.createElement('span'));
  // charCount.innerText = '14/40';
  // charCount.classList.add('char-count');
  // inputDiv.rows = 1;
  inputSpan.setAttribute('anchor', "+");

  const db = getDatabase();


  let hasFailedOnce = false;
  inputDiv.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.debug(`path: ${parentPath}`);
      // console.debug(`before push`);

      let innerText = e.target.innerText;
      if (!isInputValid(innerText)) {
        inputSpan.setAttribute('anchor', '!');
        inputDiv.innerText = 'הטקסט חייב להכיל מילה אחת לפחות';
        hasFailedOnce = true;
        // setTimeout(() => {
        //   inputSpan.setAttribute('anchor', '+');
        //   inputDiv.innerText = '';
        // }, 4000);
        return;
      }

      let childRefKey = push(ref(db, parentPath), { content: innerText }).key;
      console.debug('\n\n\n\n\nsetting last item...');
      set(lastEditMainItemRef, {
        content: innerText,
        parent: parentText,
        timestamp: Math.floor(Date.now() / 1000)
      });

      // console.debug(`after push, key: ${childRefKey}`);
      // let childRefKey = 'dfsfgh';

      let childLi;
      if (e.target.innerText.startsWith('&')) {
        childLi = prependEmptyChild(parent, e.target.innerText.substring(1), true, `${parentPath}/${childRefKey}`);
        let childH2 = childLi.children[0];
        childH2.setAttribute('anchor', '&');
        childH2.classList.add('thought');
        // childH2.style.fontFamily = 'VcDavid';
        // childH2.style.fontWeight= 700;
      } else {
        childLi = prependEmptyChild(parent, e.target.innerText, true, `${parentPath}/${childRefKey}`);

      }
      inputDiv.innerText = "";
      // let newLi = itemContent.appendChild(document.createElement(`li`));
      // newLi.textContent = "just added this";
      // inputDiv.style.backgroundColor = "red";
    } else if (hasFailedOnce) {
      inputDiv.innerText = '';
      inputSpan.setAttribute('anchor', '+');
      hasFailedOnce = false;
    }
  });

  //   let initialWidth = inputDiv.style.width;
  //   inputDiv.addEventListener('input', () => {
  //     inputDiv.style.width = `calc(min(100%, ${Math.max(10, inputDiv.innerText.length) + 1 + 'ch'})`; // set the width based on the number of characters typed
  //   });
}
const db = getDatabase();
const ITEM_CONTENT_INDEX = 1;
var lastEditRef = ref(db, 'lastedit');
var lastEditMainItemRef = ref(db, 'lastedit/mainitem');

var lastEditChild = document.getElementById('lastedit-child');
var lastEditParent = document.getElementById('lastedit-parent');
var lastEditTime = document.getElementById('lastedit-timepassed');

function prependEmptyChild(parent, childTextContent, shouldInsertAsSecond, parentPath) {
  // let itemContent = parent.children[ITEM_CONTENT_INDEX];
  let childLi;
  if (shouldInsertAsSecond) {
    childLi = appendAsSecond(parent, document.createElement('li'));
  } else {
    childLi = prependChild(parent, document.createElement('li'));
  }
  // let childH2 = childLi.appendChild(document.createElement('h2'));
  // childH2.setAttribute('anchor', ">");

  // childH2.textContent = childTextContent;
  let childItemContent = childLi.appendChild(document.createElement('ul'));
  // console.debug(`appending empty input as this path: ${parentPath}`);
  let emptyInput = appendEmptyInput(childItemContent, `${parentPath}`, 'LOREM');
  // setLiOnClick(childH2, childLi, childItemContent);

  return childLi;
  // let childItemContent =  
}

function initElements() {
  let jsonObj = JSON.parse(data);

  setBodyOnClick();
  initJsonObj(listDivElem, jsonObj);
}

function initFireObj(prevElem, parentPath, textContent) {
  if (!textContent) {
    return;
  }

  // console.debug(`\n\nAt item: ${textContent}`);
  // console.debug(`Initing li element`);
  let parentListItem = prevElem.appendChild(document.createElement(`li`));
  // console.debug(`Initing h2 element`);
  let itemName = parentListItem.appendChild(document.createElement(`h2`));
  itemName.setAttribute('anchor', ">");
  itemName.textContent = textContent;


  // itemName.style.top = `${prevElem.style.top + 25}px`;
  // console.debug(`Initing h2 element`);
  let prevItemName = prevElem.parentElement.children[0];
  // console.debug(`Initing h2 element`);
  if (window.getComputedStyle(prevItemName).getPropertyValue(`top`) == 'auto') {
    itemName.style.top = `0px`;
    itemName.style.zIndex = 9999999;

  } else {
    itemName.style.top = `${parseInt(window.getComputedStyle(prevItemName).getPropertyValue(`top`)) + MAGIC_NUMBER}px`;
    itemName.style.zIndex = parseInt(window.getComputedStyle(prevItemName).getPropertyValue('z-index')) - 1;

  }



  // console.debug(`Initing list for curr element`);
  let parentItemContent = parentListItem.appendChild(document.createElement('ul'));
  itemName.classList.add('thought');
  // console.debug(`Setting on click for the list`);
  setLiOnClick(itemName, parentListItem, parentItemContent);

  // console.debug(`Appending empty input for the list`);
  appendEmptyInput(parentItemContent, `${parentPath}`, itemName.textContent);

  onChildAdded(ref(db, parentPath), (data) => {
    if (!data.val().content) {
      return;
    }
    itemName.classList.remove('thought');
    // console.debug(parentItemContent);
    // console.debug(`is not a leaf`);
    console.debug(`Adding ${data.val().content} to ${textContent}`);
    initFireObj(parentItemContent, `${parentPath}/${data.key}`, data.val().content);


    // data.forEach((childSnapshot) => {
    // console.debug(`At for each`);
    // let listItem = parentItemContent.appendChild(document.createElement(`li`));
    // let itemName = listItem.appendChild(document.createElement(`h2`));
    // itemName.setAttribute('anchor', ">");


    // // itemName.style.top = `${prevElem.style.top + 25}px`;
    // let prevItemName = parentItemContent.parentElement.children[0];
    // if (window.getComputedStyle(prevItemName).getPropertyValue(`top`) == 'auto') {
    //   itemName.style.top = `0px`;
    //   itemName.style.zIndex = 9999999;

    // } else {
    //   itemName.style.top = `${parseInt(window.getComputedStyle(prevItemName).getPropertyValue(`top`)) + MAGIC_NUMBER}px`;
    //   itemName.style.zIndex = parseInt(window.getComputedStyle(prevItemName).getPropertyValue('z-index')) - 1;

    // }

    // itemName.textContent = data.val().content;


    // let itemContent = listItem.appendChild(document.createElement('ul'));
    // setLiOnClick(itemName, listItem, itemContent);

    // appendEmptyInput(itemContent, `${parentPath}/${data.key}`);
    // console.debug(childSnapshot.key);
    // console.debug(`pp: ${parentPath}, ${childSnapshot.val().content})`);
    // if (childSnapshot.key) {

    // let childPath = `${parentPath}/${data.key}/${childSnapshot.key}`;



    // }
    // console.debug(`\tDoing same for child: ${data.val().content}`);
    // initFireObj(prevElem, parentPath, textContent)




    // })


  }, { onlyOnce: false });
}


function initElementFromFirebase() {
  appendEmptyInput(listDivElem, 'things', 'דברים')
  let thingsRef0 = ref(db, 'things');


  // get(thingsRef0).then((snapshot) => {
  //   snapshot.forEach((childSnapshot) => {
  //     // console.debug(childSnapshot.val().content);
  //     initFireObj(listDivElem, `things/${childSnapshot.key}`)
  //     // console.debug(childSnapshot.key);
  //   },{onlyOnce: true});

  // }
  // )
  onChildAdded(thingsRef0, (data) => {
    // console.debug('child reffffffffff added');
    console.debug(`just added to: things: ${data.val().content}`);
    initFireObj(listDivElem, `things/${data.key}`, data.val().content);
  }, { onlyOnce: false });
  setBodyOnClick();
}

var intervalId;
function updateAndIntervalLastEdit(parent, content, timestamp) {
  // return;
  clearInterval(intervalId);
  lastEditParent.innerText = parent;
  lastEditChild.innerText = content;
  let nowInSecs = Math.floor(Date.now() / 1000);
  lastEditTime.innerText = getTimeElpasedString(timestamp, nowInSecs)
  let interval;
  let secsLeapsed = timestamp - nowInSecs;
  if (secsLeapsed < 60) {
    interval = 1000;
  } else {
    interval = 1000 * 30;

  }

  intervalId = setInterval(() => {
    lastEditParent.innerText = parent;
    lastEditChild.innerText = content;
    lastEditTime.innerText = getTimeElpasedString(timestamp, Math.floor(Date.now() / 1000))

  }, interval);
}

function initLastEdit() {

  console.debug(`getting`);
  get(lastEditMainItemRef).then((data) => {
    // console.debug(`\n\n\n\n\n\n\n\n\ngetting:`);
    // console.debug(`got: ${data.val().content}`);

    updateAndIntervalLastEdit(data.val().parent, data.val().content, data.val().timestamp);
    // lastEditParent.innerText = data.val().parent;
    // lastEditChild.innerText = data.val().content;
    // lastEditTime.innerText = getTimeElpasedString(data.val().timestamp, Math.floor(Date.now() / 1000))
    // setInterval(() => {
    //   lastEditParent.innerText = data.val().parent;
    //   lastEditChild.innerText = data.val().content;
    //   lastEditTime.innerText = getTimeElpasedString(data.val().timestamp, Math.floor(Date.now() / 1000));

    // }, 10000);
  });


  // set(lastEditMainItemRef, {
  //   content: "ניסיון",
  //   timestamp: 1677012337745,
  //   parent: "אבא של ניסיון"
  // })

  onChildChanged(lastEditRef, (data) => {
    let val = data.val();
    updateAndIntervalLastEdit(val.parent, val.content, val.timestamp);
    // lastEditParent.innerText = data.val().parent;
    // lastEditChild.innerText = data.val().content;
    // lastEditTime.innerText = getTimeElpasedString(data.val().timestamp, Math.floor(Date.now() / 1000));
    // setInterval(() => {
    //   console.debug(`\n\n\n********\nIn onchildchanged of last edit`);
    //   console.debug(data.val().content);
    //   lastEditParent.innerText = data.val().parent;
    //   lastEditChild.innerText = data.val().content;
    //   lastEditTime.innerText = getTimeElpasedString(data.val().timestamp, Math.floor(Date.now() / 1000));

    // }, 10000);
  }, { onlyOnce: false });
}

function formatDuration(seconds) {
  if (seconds == 0) {
    return "0 שניות";
  }
  const units = [
    { label: "ימים", duration: 86400 },
    { label: "שעות", duration: 3600 },
    { label: "דקות", duration: 60 },
    { label: "שניות", duration: 1 },
  ];

  let remainingSeconds = seconds;
  let durationString = "";

  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    const count = Math.floor(remainingSeconds / unit.duration);
    remainingSeconds -= count * unit.duration;
    if (count > 0) {
      durationString += `${count} ${unit.label}${count > 1 ? "" : ""} `;
      break;
    }
  }

  let trimmed = durationString.trim();
  if (trimmed == '1 שניות') {
    return 'שניה';
  } else if (trimmed == '1 דקות') {
    return 'דקה';
  } else {
    return trimmed;
  }
}


function getTimeElpasedString(firstSeconds, nowSeconds) {
  let secondsElapsed = nowSeconds - firstSeconds;
  return formatDuration(secondsElapsed);
}

function main() {
  // initDrawing();
  // animate();
  // initElements();
  initLastEdit();
  initElementFromFirebase();
  // initFirebaseTest();

}

main();