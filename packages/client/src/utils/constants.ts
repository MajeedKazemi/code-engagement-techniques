export enum EditorType {
    baseline = "baseline",
    stepByStep = "stepByStep",
    leadReveal = "leadReveal",
}

export enum TaskType {
    Authoring = "authoring",
    Modifying = "modifying",
    ShortAnswer = "shortAnswer",
    MultipleChoice = "multipleChoice",
    WatchVideo = "watchVideo",
    Coding = "coding",
}

type Step = {
    step: number;
    currLine: number;
    nextLine: number | null;
    printOutput: any[];
    frame: any[];
};

type TaskTraceType = {
    [key: number]: Step[];
};

// const task1Trace = [
//     {
//         "step": 1,
//         "currLine": 1,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 2,
//         "currLine": 7,
//         "nextLine": 2,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 3,
//         "currLine": 2,
//         "nextLine": 3,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 4,
//         "currLine": 3,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 5,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": []
//             }
//         ]
//     },
//     {
//         "step": 6,
//         "currLine": 5,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": []
//             }
//         ]
//     },
//     {
//         "step": 7,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 8,
//         "currLine": 5,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 9,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 10,
//         "currLine": 5,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 11,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     3,
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 12,
//         "currLine": 5,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     3,
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 13,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     4,
//                     3,
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 14,
//         "currLine": 5,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": [
//                     5
//                 ]
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     4,
//                     3,
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 15,
//         "currLine": 4,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     5,
//                     4,
//                     3,
//                     2,
//                     1
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 16,
//         "currLine": 6,
//         "nextLine": null,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "input_list",
//                 "type": "str",
//                 "value": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             {
//                 "name": "queue",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "reversed_list",
//                 "type": "str",
//                 "value": [
//                     5,
//                     4,
//                     3,
//                     2,
//                     1
//                 ]
//             }
//         ]
//     }
// ]

const task1Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 11,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 11,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 3,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            }
        ]
    },
    {
        "step": 4,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 5,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 6,
        "currLine": 5,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 7,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 8,
        "currLine": 4,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 9,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 10,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 11,
        "currLine": 9,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 12,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 13,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 14,
        "currLine": 5,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 15,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 16,
        "currLine": 4,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 17,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 18,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 19,
        "currLine": 9,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 20,
        "currLine": 3,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 21,
        "currLine": 10,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 22,
        "currLine": 12,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 23,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            }
        ]
    },
    {
        "step": 24,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 25,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 26,
        "currLine": 5,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 27,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 28,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 29,
        "currLine": 5,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 30,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "[",
                    "["
                ]
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 31,
        "currLine": 4,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "[",
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 32,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "[",
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 33,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "[",
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 34,
        "currLine": 9,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "[",
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 35,
        "currLine": 3,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 36,
        "currLine": 10,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "txt",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    "["
                ]
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    }
]


const task3Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 7,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 7,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 3,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            }
        ]
    },
    {
        "step": 4,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 5,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": []
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            }
        ]
    },
    {
        "step": 6,
        "currLine": 5,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": []
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            }
        ]
    },
    {
        "step": 7,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4
                ]
            }
        ]
    },
    {
        "step": 8,
        "currLine": 5,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4
                ]
            }
        ]
    },
    {
        "step": 9,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            }
        ]
    },
    {
        "step": 10,
        "currLine": 5,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            }
        ]
    },
    {
        "step": 11,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4,
                    3
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            }
        ]
    },
    {
        "step": 12,
        "currLine": 5,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4,
                    3
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            }
        ]
    },
    {
        "step": 13,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4,
                    3,
                    2
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1
                ]
            }
        ]
    },
    {
        "step": 14,
        "currLine": 5,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4,
                    3,
                    2
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    1
                ]
            }
        ]
    },
    {
        "step": 15,
        "currLine": 4,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4,
                    3,
                    2,
                    1
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 16,
        "currLine": 6,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "input_list",
                "type": "str",
                "value": [
                    1,
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "reversed_list",
                "type": "str",
                "value": [
                    5,
                    4,
                    3,
                    2,
                    1
                ]
            },
            {
                "name": "stack",
                "type": "str",
                "value": []
            }
        ]
    }
];

// const task2Trace = [
//     {
//         "step": 1,
//         "currLine": 1,
//         "nextLine": 16,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 2,
//         "currLine": 16,
//         "nextLine": 2,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 3,
//         "currLine": 2,
//         "nextLine": 3,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             }
//         ]
//     },
//     {
//         "step": 4,
//         "currLine": 3,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 5,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     ""
//                 ]
//             }
//         ]
//     },
//     {
//         "step": 6,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     ""
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             }
//         ]
//     },
//     {
//         "step": 7,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     ""
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             }
//         ]
//     },
//     {
//         "step": 8,
//         "currLine": 7,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": ""
//             }
//         ]
//     },
//     {
//         "step": 9,
//         "currLine": 10,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": ""
//             }
//         ]
//     },
//     {
//         "step": 10,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": ""
//             }
//         ]
//     },
//     {
//         "step": 11,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "A"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": ""
//             }
//         ]
//     },
//     {
//         "step": 12,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "A"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": ""
//             }
//         ]
//     },
//     {
//         "step": 13,
//         "currLine": 7,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             }
//         ]
//     },
//     {
//         "step": 14,
//         "currLine": 10,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             }
//         ]
//     },
//     {
//         "step": 15,
//         "currLine": 11,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             }
//         ]
//     },
//     {
//         "step": 16,
//         "currLine": 12,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "A"
//             }
//         ]
//     },
//     {
//         "step": 17,
//         "currLine": 11,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "A"
//             }
//         ]
//     },
//     {
//         "step": 18,
//         "currLine": 12,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "C"
//             }
//         ]
//     },
//     {
//         "step": 19,
//         "currLine": 11,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "C"
//             }
//         ]
//     },
//     {
//         "step": 20,
//         "currLine": 12,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "G"
//             }
//         ]
//     },
//     {
//         "step": 21,
//         "currLine": 11,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC",
//                     "AG"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "G"
//             }
//         ]
//     },
//     {
//         "step": 22,
//         "currLine": 12,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC",
//                     "AG"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 23,
//         "currLine": 11,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC",
//                     "AG",
//                     "AT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 24,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC",
//                     "AG",
//                     "AT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 25,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AA",
//                     "AC",
//                     "AG",
//                     "AT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "A"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 26,
//         "currLine": 7,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AC",
//                     "AG",
//                     "AT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AA"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 27,
//         "currLine": 10,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AC",
//                     "AG",
//                     "AT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AA"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 28,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AC",
//                     "AG",
//                     "AT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AA"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 29,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AC",
//                     "AG",
//                     "AT",
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AA"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 30,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AC",
//                     "AG",
//                     "AT",
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AA"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 31,
//         "currLine": 7,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AG",
//                     "AT",
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AC"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 32,
//         "currLine": 10,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AG",
//                     "AT",
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AC"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 33,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AG",
//                     "AT",
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AC"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 34,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AG",
//                     "AT",
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AC"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 35,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AG",
//                     "AT",
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AC"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 36,
//         "currLine": 7,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AT",
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AG"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 37,
//         "currLine": 10,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AT",
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AG"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 38,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AT",
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AG"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 39,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AT",
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AG"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 40,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AT",
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AG"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 41,
//         "currLine": 7,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 42,
//         "currLine": 10,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 43,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 44,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 45,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 46,
//         "currLine": 7,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AAT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 47,
//         "currLine": 8,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AAT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 48,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AAT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 49,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AAT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 50,
//         "currLine": 7,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ACT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 51,
//         "currLine": 8,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ACT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 52,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ACT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 53,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ACT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 54,
//         "currLine": 7,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AGT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 55,
//         "currLine": 8,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AGT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 56,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AGT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 57,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": [
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "AGT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 58,
//         "currLine": 7,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ATT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 59,
//         "currLine": 8,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ATT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 60,
//         "currLine": 5,
//         "nextLine": 15,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ATT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     },
//     {
//         "step": 61,
//         "currLine": 15,
//         "nextLine": null,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "pattern",
//                 "type": "str",
//                 "value": "A*T"
//             },
//             {
//                 "name": "dna_chars",
//                 "type": "str",
//                 "value": [
//                     "A",
//                     "C",
//                     "G",
//                     "T"
//                 ]
//             },
//             {
//                 "name": "q",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "result",
//                 "type": "str",
//                 "value": [
//                     "AAT",
//                     "ACT",
//                     "AGT",
//                     "ATT"
//                 ]
//             },
//             {
//                 "name": "seq",
//                 "type": "str",
//                 "value": "ATT"
//             },
//             {
//                 "name": "ch",
//                 "type": "str",
//                 "value": "T"
//             }
//         ]
//     }
// ];

const task2Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 16,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 16,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 3,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 4,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "",
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            }
        ]
    },
    {
        "step": 5,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "",
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 6,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "",
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 7,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 8,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 9,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 10,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 11,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 12,
        "currLine": 13,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[",
                        1,
                        0,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 13,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[",
                        1,
                        0,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 14,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[",
                        1,
                        0,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 15,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 16,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 17,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 18,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 19,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 20,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[",
                        2,
                        0,
                        2,
                        2
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 21,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[",
                        2,
                        0,
                        2,
                        2
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 22,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[",
                        2,
                        0,
                        2,
                        2
                    ],
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 23,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[",
                        2,
                        0,
                        2,
                        2
                    ],
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 24,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 25,
        "currLine": 9,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 26,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 27,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 28,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ],
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 29,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ],
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 30,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 31,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 32,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 33,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 34,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 35,
        "currLine": 13,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ],
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 36,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ],
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 37,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]",
                        2,
                        1,
                        2,
                        1
                    ],
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 38,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 39,
        "currLine": 9,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 40,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 41,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 42,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ],
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 43,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ],
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 44,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 45,
        "currLine": 9,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 46,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 47,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 48,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ],
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 49,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[[]]",
                        2,
                        2,
                        2,
                        0
                    ],
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 50,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 51,
        "currLine": 7,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 52,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[[]]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 53,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[[]]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[[]]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 2
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 54,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[[]]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 55,
        "currLine": 7,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[[]]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 56,
        "currLine": 4,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[[]]",
                    "[][]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 57,
        "currLine": 15,
        "nextLine": 17,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "d",
                "type": "int",
                "value": 2
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[[]]",
                    "[][]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 58,
        "currLine": 17,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 59,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 60,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "",
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            }
        ]
    },
    {
        "step": 61,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "",
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 62,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "",
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 63,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 64,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 65,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 66,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 67,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 68,
        "currLine": 13,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[",
                        1,
                        0,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 69,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[",
                        1,
                        0,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 70,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[",
                        1,
                        0,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "str",
                "value": ""
            },
            {
                "name": "opens",
                "type": "int",
                "value": 0
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 71,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 72,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 73,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 74,
        "currLine": 11,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 75,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 76,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 77,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 78,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[]",
                        1,
                        1,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 0
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 79,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 80,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 81,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 82,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 83,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 84,
        "currLine": 13,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 85,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 86,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][",
                        2,
                        1,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 1
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 87,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 88,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 89,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 90,
        "currLine": 11,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 91,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 92,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 93,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 94,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][]",
                        2,
                        2,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 1
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 95,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 96,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 97,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 98,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 99,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 100,
        "currLine": 13,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][][",
                        3,
                        2,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 101,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][][",
                        3,
                        2,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 102,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][][",
                        3,
                        2,
                        1,
                        1
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 2
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 103,
        "currLine": 6,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 104,
        "currLine": 9,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 105,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 106,
        "currLine": 14,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 107,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][][]",
                        3,
                        3,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 108,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    [
                        "[][][]",
                        3,
                        3,
                        1,
                        0
                    ]
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][]["
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 2
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 109,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 3
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 110,
        "currLine": 7,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 3
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 111,
        "currLine": 4,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[][][]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 3
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 112,
        "currLine": 15,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 3
            },
            {
                "name": "d",
                "type": "int",
                "value": 1
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "[][][]"
                ]
            },
            {
                "name": "s",
                "type": "list",
                "value": "[][][]"
            },
            {
                "name": "opens",
                "type": "int",
                "value": 3
            },
            {
                "name": "closes",
                "type": "int",
                "value": 3
            },
            {
                "name": "max_d",
                "type": "int",
                "value": 1
            },
            {
                "name": "cur_d",
                "type": "int",
                "value": 0
            },
            {
                "name": "new_max_d",
                "type": "int",
                "value": 1
            }
        ]
    }
]


const task4Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 20,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 20,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 3,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            }
        ]
    },
    {
        "step": 4,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            }
        ]
    },
    {
        "step": 5,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            }
        ]
    },
    {
        "step": 6,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 7,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 8,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 9,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 10,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 11,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            }
        ]
    },
    {
        "step": 12,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 13,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            }
        ]
    },
    {
        "step": 14,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 15,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 16,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 17,
        "currLine": 14,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 18,
        "currLine": 15,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 19,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 20,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 21,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 22,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 23,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 24,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 25,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 26,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 27,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 28,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 29,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 30,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 31,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 32,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 33,
        "currLine": 13,
        "nextLine": 17,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 34,
        "currLine": 17,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 35,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 36,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 37,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 38,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 39,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 40,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 41,
        "currLine": 13,
        "nextLine": 17,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 42,
        "currLine": 17,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 43,
        "currLine": 5,
        "nextLine": 18,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 44,
        "currLine": 18,
        "nextLine": 21,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "list",
                "value": "[]<[>]"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    2,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 45,
        "currLine": 21,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 46,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            }
        ]
    },
    {
        "step": 47,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            }
        ]
    },
    {
        "step": 48,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            }
        ]
    },
    {
        "step": 49,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 50,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            }
        ]
    },
    {
        "step": 51,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            }
        ]
    },
    {
        "step": 52,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            }
        ]
    },
    {
        "step": 53,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            }
        ]
    },
    {
        "step": 54,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            }
        ]
    },
    {
        "step": 55,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            }
        ]
    },
    {
        "step": 56,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            }
        ]
    },
    {
        "step": 57,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 58,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 59,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 60,
        "currLine": 14,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1,
                    0
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 61,
        "currLine": 15,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 0
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 62,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 63,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 64,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 65,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 66,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 67,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 68,
        "currLine": 13,
        "nextLine": 17,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 69,
        "currLine": 17,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    -1
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 70,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 71,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 72,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 73,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 74,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 75,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "str",
                "value": "<"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 76,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 77,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 78,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 79,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "list",
                "value": "["
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 80,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 81,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 82,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 83,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "dict",
                "value": "{"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 84,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 85,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": false
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 86,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": false
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 87,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": false
            }
        ]
    },
    {
        "step": 88,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 89,
        "currLine": 14,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 90,
        "currLine": 15,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 91,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 92,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "}"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 93,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 94,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 95,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 96,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 97,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 98,
        "currLine": 14,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3,
                    4
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 99,
        "currLine": 15,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 2
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 100,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 101,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": "]"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 102,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 103,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 104,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 105,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 106,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 107,
        "currLine": 14,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 108,
        "currLine": 15,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 4
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 109,
        "currLine": 5,
        "nextLine": 18,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 6
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    },
    {
        "step": 110,
        "currLine": 18,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "dict",
                "value": "{}]<[{}]>"
            },
            {
                "name": "map",
                "type": "str",
                "value": {
                    "[": "]",
                    "<": ">",
                    "{": "}"
                }
            },
            {
                "name": "stack",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "max_length",
                "type": "int",
                "value": 6
            },
            {
                "name": "i",
                "type": "int",
                "value": 8
            },
            {
                "name": "char",
                "type": "str",
                "value": ">"
            },
            {
                "name": "not_empty",
                "type": "bool",
                "value": true
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": true
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": true
            }
        ]
    }
]


//     {
//         "step": 1,
//         "currLine": 1,
//         "nextLine": 18,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 2,
//         "currLine": 18,
//         "nextLine": 2,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 3,
//         "currLine": 2,
//         "nextLine": 3,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             }
//         ]
//     },
//     {
//         "step": 4,
//         "currLine": 3,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             }
//         ]
//     },
//     {
//         "step": 5,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             }
//         ]
//     },
//     {
//         "step": 6,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             }
//         ]
//     },
//     {
//         "step": 7,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "3"
//             }
//         ]
//     },
//     {
//         "step": 8,
//         "currLine": 7,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "3"
//             }
//         ]
//     },
//     {
//         "step": 9,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 3
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "3"
//             }
//         ]
//     },
//     {
//         "step": 10,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 3
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             }
//         ]
//     },
//     {
//         "step": 11,
//         "currLine": 8,
//         "nextLine": 9,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 3
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             }
//         ]
//     },
//     {
//         "step": 12,
//         "currLine": 9,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 3
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             }
//         ]
//     },
//     {
//         "step": 13,
//         "currLine": 10,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 3
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             }
//         ]
//     },
//     {
//         "step": 14,
//         "currLine": 11,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 3
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             }
//         ]
//     },
//     {
//         "step": 15,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             }
//         ]
//     },
//     {
//         "step": 16,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 17,
//         "currLine": 8,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 18,
//         "currLine": 12,
//         "nextLine": 16,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 19,
//         "currLine": 16,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 20,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "a"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 21,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "a"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             }
//         ]
//     },
//     {
//         "step": 22,
//         "currLine": 8,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "a"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             }
//         ]
//     },
//     {
//         "step": 23,
//         "currLine": 12,
//         "nextLine": 13,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "a"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             }
//         ]
//     },
//     {
//         "step": 24,
//         "currLine": 13,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "",
//                         3
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "a"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             }
//         ]
//     },
//     {
//         "step": 25,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "a"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 26,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 27,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "2"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 28,
//         "currLine": 7,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "2"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 29,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "2"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 30,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 31,
//         "currLine": 8,
//         "nextLine": 9,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 32,
//         "currLine": 9,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 33,
//         "currLine": 10,
//         "nextLine": 11,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 34,
//         "currLine": 11,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 35,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "list",
//                 "value": "["
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 36,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 37,
//         "currLine": 8,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 38,
//         "currLine": 12,
//         "nextLine": 16,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 39,
//         "currLine": 16,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 40,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 41,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "c"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 42,
//         "currLine": 8,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "c"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 43,
//         "currLine": 12,
//         "nextLine": 16,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "c"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 44,
//         "currLine": 16,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "b"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "c"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 45,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "bc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "c"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 46,
//         "currLine": 6,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "bc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 47,
//         "currLine": 8,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "bc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 48,
//         "currLine": 12,
//         "nextLine": 13,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "bc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 49,
//         "currLine": 13,
//         "nextLine": 14,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": [
//                     [
//                         "aaa",
//                         2
//                     ]
//                 ]
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "bc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": ""
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 3
//             }
//         ]
//     },
//     {
//         "step": 50,
//         "currLine": 14,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "bc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 2
//             }
//         ]
//     },
//     {
//         "step": 51,
//         "currLine": 5,
//         "nextLine": 17,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaabcbc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 2
//             }
//         ]
//     },
//     {
//         "step": 52,
//         "currLine": 17,
//         "nextLine": null,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "3[a]2[bc]"
//             },
//             {
//                 "name": "stack",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "current_string",
//                 "type": "str",
//                 "value": "aaabcbc"
//             },
//             {
//                 "name": "current_num",
//                 "type": "int",
//                 "value": 0
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "]"
//             },
//             {
//                 "name": "last_string",
//                 "type": "str",
//                 "value": "aaa"
//             },
//             {
//                 "name": "num",
//                 "type": "int",
//                 "value": 2
//             }
//         ]
//     }
// ];

const task5Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 7,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 7,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 3,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            }
        ]
    },
    {
        "step": 4,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "r",
                    "a",
                    "c",
                    "e",
                    "c",
                    "a",
                    "r"
                ]
            }
        ]
    },
    {
        "step": 5,
        "currLine": 4,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "r",
                    "a",
                    "c",
                    "e",
                    "c",
                    "a",
                    "r"
                ]
            }
        ]
    },
    {
        "step": 6,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "a",
                    "c",
                    "e",
                    "c",
                    "a"
                ]
            }
        ]
    },
    {
        "step": 7,
        "currLine": 4,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "a",
                    "c",
                    "e",
                    "c",
                    "a"
                ]
            }
        ]
    },
    {
        "step": 8,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "c",
                    "e",
                    "c"
                ]
            }
        ]
    },
    {
        "step": 9,
        "currLine": 4,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "c",
                    "e",
                    "c"
                ]
            }
        ]
    },
    {
        "step": 10,
        "currLine": 3,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "e"
                ]
            }
        ]
    },
    {
        "step": 11,
        "currLine": 6,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "s",
                "type": "str",
                "value": "racecar"
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    "e"
                ]
            }
        ]
    }
];

//     {
//         "step": 1,
//         "currLine": 1,
//         "nextLine": 12,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 2,
//         "currLine": 12,
//         "nextLine": 2,
//         "printOutput": [],
//         "frame": []
//     },
//     {
//         "step": 3,
//         "currLine": 2,
//         "nextLine": 3,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             }
//         ]
//     },
//     {
//         "step": 4,
//         "currLine": 3,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             }
//         ]
//     },
//     {
//         "step": 5,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {}
//             }
//         ]
//     },
//     {
//         "step": 6,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {}
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 7,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {}
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 8,
//         "currLine": 7,
//         "nextLine": 8,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 9,
//         "currLine": 8,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 10,
//         "currLine": 7,
//         "nextLine": 9,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 11,
//         "currLine": 9,
//         "nextLine": 4,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 12,
//         "currLine": 4,
//         "nextLine": 5,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 13,
//         "currLine": 5,
//         "nextLine": 6,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": []
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 14,
//         "currLine": 6,
//         "nextLine": 7,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 1
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 15,
//         "currLine": 7,
//         "nextLine": 9,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 2
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 16,
//         "currLine": 9,
//         "nextLine": 10,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 2
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     },
//     {
//         "step": 17,
//         "currLine": 10,
//         "nextLine": null,
//         "printOutput": [],
//         "frame": [
//             {
//                 "name": "s",
//                 "type": "str",
//                 "value": "aabbccddeeff"
//             },
//             {
//                 "name": "k",
//                 "type": "int",
//                 "value": 2
//             },
//             {
//                 "name": "dq",
//                 "type": "str",
//                 "value": [
//                     "a"
//                 ]
//             },
//             {
//                 "name": "char_count",
//                 "type": "str",
//                 "value": {
//                     "a": 2
//                 }
//             },
//             {
//                 "name": "char",
//                 "type": "str",
//                 "value": "a"
//             }
//         ]
//     }
// ];

const task6Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 13,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 13,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 3,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            }
        ]
    },
    {
        "step": 4,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 5,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 6,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 4
            }
        ]
    },
    {
        "step": 7,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 4
            }
        ]
    },
    {
        "step": 8,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 4
            }
        ]
    },
    {
        "step": 9,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 4
            }
        ]
    },
    {
        "step": 10,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 4
            }
        ]
    },
    {
        "step": 11,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 12,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 13,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 14,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0,
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 15,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0,
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 16,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0,
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 17,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0,
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 18,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0,
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 19,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 20,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 21,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 22,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 23,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 24,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 12
            }
        ]
    },
    {
        "step": 25,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 3
            }
        ]
    },
    {
        "step": 26,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 3
            }
        ]
    },
    {
        "step": 27,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 3
            }
        ]
    },
    {
        "step": 28,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 3
            }
        ]
    },
    {
        "step": 29,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 3
            }
        ]
    },
    {
        "step": 30,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 3
            }
        ]
    },
    {
        "step": 31,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 32,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 33,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 34,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 35,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 36,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 37,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 38,
        "currLine": 4,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12,
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 39,
        "currLine": 12,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    4,
                    2,
                    12,
                    3,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 4
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    12,
                    12
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 40,
        "currLine": 14,
        "nextLine": 2,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 41,
        "currLine": 2,
        "nextLine": 3,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 42,
        "currLine": 3,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 43,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            }
        ]
    },
    {
        "step": 44,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 9
            }
        ]
    },
    {
        "step": 45,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 9
            }
        ]
    },
    {
        "step": 46,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 9
            }
        ]
    },
    {
        "step": 47,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 9
            }
        ]
    },
    {
        "step": 48,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "n",
                "type": "int",
                "value": 9
            }
        ]
    },
    {
        "step": 49,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 50,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 51,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    0
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 52,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 53,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 54,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 55,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 56,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "n",
                "type": "int",
                "value": 11
            }
        ]
    },
    {
        "step": 57,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 8
            }
        ]
    },
    {
        "step": 58,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 8
            }
        ]
    },
    {
        "step": 59,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 8
            }
        ]
    },
    {
        "step": 60,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 8
            }
        ]
    },
    {
        "step": 61,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 8
            }
        ]
    },
    {
        "step": 62,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": 8
            }
        ]
    },
    {
        "step": 63,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 64,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 65,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 66,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 67,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 68,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 69,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 3
            },
            {
                "name": "n",
                "type": "int",
                "value": 5
            }
        ]
    },
    {
        "step": 70,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 71,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 72,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 73,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 74,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 75,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 76,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 77,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 78,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 4
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 79,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 80,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 81,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 82,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 83,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": []
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 84,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 85,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 86,
        "currLine": 4,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7,
                    10
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    },
    {
        "step": 87,
        "currLine": 12,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    9,
                    11,
                    8,
                    5,
                    7,
                    10
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 2
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    11,
                    11,
                    8,
                    7,
                    10
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 5
            },
            {
                "name": "n",
                "type": "int",
                "value": 10
            }
        ]
    }
]

export const taskTrace: TaskTraceType = {
    1: task1Trace,
    2: task2Trace,
    3: task3Trace,
    4: task4Trace,
    5: task5Trace,
    6: task6Trace,
};

export const taskTrace5 = [
    [],
    [],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1]
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 0
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 0
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 0
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 0
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 1
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 1
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 1
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": "("
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        },
        {
            "name": "last_is_open",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        },
        {
            "name": "last_is_open",
            "type": "bool",
            "value": true
        },
        {
            "name": "is_match",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0, 1]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        },
        {
            "name": "last_is_open",
            "type": "bool",
            "value": true
        },
        {
            "name": "is_match",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 0
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        },
        {
            "name": "last_is_open",
            "type": "bool",
            "value": true
        },
        {
            "name": "is_match",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 2
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        },
        {
            "name": "last_is_open",
            "type": "bool",
            "value": true
        },
        {
            "name": "is_match",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "(()"
        },
        {
            "name": "map",
            "type": "dict",
            "value": {
                "(": ")",
                "[": "]",
                "{": "}"
            }
        },
        {
            "name": "stack",
            "type": "list",
            "value": [-1, 0]
        },
        {
            "name": "max_length",
            "type": "int",
            "value": 2
        },
        {
            "name": "i",
            "type": "int",
            "value": 2
        },
        {
            "name": "char",
            "type": "str",
            "value": ")"
        },
        {
            "name": "not_empty",
            "type": "bool",
            "value": true
        },
        {
            "name": "last_is_open",
            "type": "bool",
            "value": true
        },
        {
            "name": "is_match",
            "type": "bool",
            "value": true
        }
    ],
    [
        {
            "name": "value",
            "type": "int",
            "value": 2
        }
    ],
    []
]

