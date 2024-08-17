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
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
        "step": 12,
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
                "name": "m",
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
                "name": "m",
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
        "currLine": 6,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 15,
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
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
        "step": 18,
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
                "name": "m",
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
        "step": 19,
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
                "name": "m",
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
        "step": 20,
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
                "name": "m",
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
        "step": 21,
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
                "name": "m",
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
        "step": 22,
        "currLine": 6,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 23,
        "currLine": 10,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 24,
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
                "name": "m",
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
                "name": "m",
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
                "name": "m",
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
        "step": 27,
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
                "name": "m",
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
        "step": 28,
        "currLine": 6,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 29,
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
                "name": "m",
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
        "step": 30,
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
                "name": "m",
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
                "name": "m",
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
        "step": 32,
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
                "name": "m",
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
        "step": 33,
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
                "name": "m",
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
        "step": 34,
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
                "name": "m",
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
        "step": 35,
        "currLine": 6,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 36,
        "currLine": 10,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 37,
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
                "name": "m",
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
        "step": 38,
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
                "name": "m",
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
                "name": "m",
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
        "step": 40,
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
                "name": "m",
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
        "step": 41,
        "currLine": 6,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 42,
        "currLine": 10,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 43,
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
                "name": "m",
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
        "step": 44,
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
                "name": "m",
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
                "name": "m",
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
        "step": 46,
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
                "name": "m",
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
        "step": 47,
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
                "name": "m",
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
        "step": 48,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 49,
        "currLine": 8,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 50,
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
                "name": "m",
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
        "step": 51,
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
                "name": "m",
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
        "step": 52,
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
                "name": "m",
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
        "step": 53,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 54,
        "currLine": 8,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
        "step": 55,
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
                "name": "m",
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
        "step": 56,
        "currLine": 15,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "n",
                "type": "int",
                "value": 2
            },
            {
                "name": "m",
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
    }
];

const task1Trace = [
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
                "name": "queue",
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
                "name": "queue",
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
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
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
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    2,
                    3,
                    4,
                    5
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
                    2,
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    3,
                    4,
                    5
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
                    2,
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    3,
                    4,
                    5
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
                    3,
                    2,
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    4,
                    5
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
                    3,
                    2,
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    4,
                    5
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
                    4,
                    3,
                    2,
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    5
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
                    4,
                    3,
                    2,
                    1
                ]
            },
            {
                "name": "queue",
                "type": "str",
                "value": [
                    5
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
                "name": "queue",
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
                "name": "queue",
                "type": "str",
                "value": []
            }
        ]
    }
];

const task4Trace = [
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 19,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 19,
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
                "value": "(()"
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
                "type": "str",
                "value": "("
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
                "type": "str",
                "value": "("
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
                "type": "str",
                "value": "("
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
                "value": "("
            }
        ]
    },
    {
        "step": 12,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
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
                "value": "("
            }
        ]
    },
    {
        "step": 13,
        "currLine": 8,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0,
                    1
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
                "value": "("
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
                "value": [
                    -1,
                    0,
                    1
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
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": "("
            }
        ]
    },
    {
        "step": 15,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0,
                    1
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
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": ")"
            }
        ]
    },
    {
        "step": 16,
        "currLine": 7,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0,
                    1
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
                "value": 2
            },
            {
                "name": "char",
                "type": "str",
                "value": ")"
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
                "value": [
                    -1,
                    0,
                    1
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
        ]
    },
    {
        "step": 18,
        "currLine": 11,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0,
                    1
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
        ]
    },
    {
        "step": 19,
        "currLine": 12,
        "nextLine": 13,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0,
                    1
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
        ]
    },
    {
        "step": 20,
        "currLine": 13,
        "nextLine": 14,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0,
                    1
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
        ]
    },
    {
        "step": 21,
        "currLine": 14,
        "nextLine": 15,
        "printOutput": [],
        "frame": [
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
        ]
    },
    {
        "step": 22,
        "currLine": 15,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0
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
        ]
    },
    {
        "step": 23,
        "currLine": 5,
        "nextLine": 18,
        "printOutput": [],
        "frame": [
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
                "value": [
                    -1,
                    0
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
        ]
    },
    {
        "step": 24,
        "currLine": 18,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "value",
                "type": "int",
                "value": 2
            }
        ]
    }
]

// const task6Trace = [
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

// const task8Trace = [
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 1
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 1
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 1
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 1
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 1
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 12,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 13,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 14,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 15,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 16,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 17,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 3
            }
        ]
    },
    {
        "step": 18,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": -1
            }
        ]
    },
    {
        "step": 19,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": -1
            }
        ]
    },
    {
        "step": 20,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": 2
            },
            {
                "name": "n",
                "type": "int",
                "value": -1
            }
        ]
    },
    {
        "step": 21,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": -1
            }
        ]
    },
    {
        "step": 22,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                "value": -1
            }
        ]
    },
    {
        "step": 23,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3
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
                "value": -1
            }
        ]
    },
    {
        "step": 24,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3
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
                "value": -3
            }
        ]
    },
    {
        "step": 25,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3
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
                "value": -3
            }
        ]
    },
    {
        "step": 26,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3
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
                "value": -3
            }
        ]
    },
    {
        "step": 27,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3
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
                "value": -3
            }
        ]
    },
    {
        "step": 28,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3
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
                "value": -3
            }
        ]
    },
    {
        "step": 29,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3
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
                "value": -3
            }
        ]
    },
    {
        "step": 30,
        "currLine": 5,
        "nextLine": 6,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 31,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    1,
                    2,
                    3
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3
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
                "value": 5
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 34,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 35,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 36,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 37,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
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
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 39,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3
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
                "value": 5
            }
        ]
    },
    {
        "step": 40,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5
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
                "value": 5
            }
        ]
    },
    {
        "step": 41,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5
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
                "value": 3
            }
        ]
    },
    {
        "step": 42,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5
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
                "value": 3
            }
        ]
    },
    {
        "step": 43,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5
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
                "value": 3
            }
        ]
    },
    {
        "step": 44,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4,
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5
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
                "value": 3
            }
        ]
    },
    {
        "step": 45,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4,
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5
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
                "value": 3
            }
        ]
    },
    {
        "step": 46,
        "currLine": 4,
        "nextLine": 5,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4,
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5
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
                "value": 3
            }
        ]
    },
    {
        "step": 47,
        "currLine": 5,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4,
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
            }
        ]
    },
    {
        "step": 48,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4,
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
            }
        ]
    },
    {
        "step": 49,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    4,
                    5
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    6
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    6
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    6
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 6
            },
            {
                "name": "n",
                "type": "int",
                "value": 6
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
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    6
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 58,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    6
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 59,
        "currLine": 8,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    6
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 60,
        "currLine": 7,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 61,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
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
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 62,
        "currLine": 10,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    7
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 63,
        "currLine": 11,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    7
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 64,
        "currLine": 4,
        "nextLine": 12,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    7
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    },
    {
        "step": 65,
        "currLine": 12,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "nums",
                "type": "str",
                "value": [
                    1,
                    3,
                    -1,
                    -3,
                    5,
                    3,
                    6,
                    7
                ]
            },
            {
                "name": "k",
                "type": "int",
                "value": 3
            },
            {
                "name": "dq",
                "type": "str",
                "value": [
                    7
                ]
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    3,
                    3,
                    5,
                    5,
                    6,
                    7
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 7
            },
            {
                "name": "n",
                "type": "int",
                "value": 7
            }
        ]
    }
];

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

