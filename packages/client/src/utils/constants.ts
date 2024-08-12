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

export const task4Trace =  [{ step: 1, currLine: 1, nextLine: 2, printOutput: [], frame: [] },
{ step: 2, currLine: 2, nextLine: 3, printOutput: [], frame: [] }];

export const task3Trace =
[
    {
        "step": 1,
        "currLine": 1,
        "nextLine": 12,
        "printOutput": [],
        "frame": []
    },
    {
        "step": 2,
        "currLine": 12,
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "1"
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "i",
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 9,
        "currLine": 8,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": []
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 10,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": []
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 11,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "10"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
            },
            {
                "name": "current_int",
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "10",
                    "11"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 0
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
            },
            {
                "name": "current_int",
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
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "10",
                    "11"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "1"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 14,
        "currLine": 6,
        "nextLine": 7,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 1
            }
        ]
    },
    {
        "step": 15,
        "currLine": 7,
        "nextLine": 8,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 16,
        "currLine": 8,
        "nextLine": 9,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 17,
        "currLine": 9,
        "nextLine": 10,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1",
                    "10"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 18,
        "currLine": 10,
        "nextLine": 4,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1",
                    "10"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11",
                    "100"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 19,
        "currLine": 4,
        "nextLine": 11,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1",
                    "10"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11",
                    "100",
                    "101"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 2
            }
        ]
    },
    {
        "step": 20,
        "currLine": 11,
        "nextLine": null,
        "printOutput": [],
        "frame": [
            {
                "name": "n1",
                "type": "int",
                "value": 1
            },
            {
                "name": "n2",
                "type": "int",
                "value": 2
            },
            {
                "name": "result",
                "type": "str",
                "value": [
                    "1",
                    "10"
                ]
            },
            {
                "name": "q",
                "type": "str",
                "value": [
                    "11",
                    "100",
                    "101"
                ]
            },
            {
                "name": "i",
                "type": "int",
                "value": 1
            },
            {
                "name": "current",
                "type": "str",
                "value": "10"
            },
            {
                "name": "current_int",
                "type": "int",
                "value": 2
            }
        ]
    }
];

const task2Trace = [{ step: 1, currLine: 1, nextLine: 2, printOutput: [], frame: [] },
{ step: 2, currLine: 2, nextLine: 3, printOutput: [], frame: [] }];

export const taskTrace2 = 
[
    [],
    [],
    [
        {
            "name": "s",
            "type": "str",
            "value": "()(()))))"
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
            "value": [-1]
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": ")"
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": ")"
        }
    ],
    [
        {
            "name": "s",
            "type": "str",
            "value": "()(()))))"
        },
        {
            "name": "map",
            "type": "str",
            "value": {
                "(": ")",
                "[": "]"
            }
        },
        {
            "name": "stack",
            "type": "str",
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
            "value": ")",
            "not_empty": true
        }
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 0], "type": "list"},
        {"name": "max_length", "value": 0, "type": "int"},
        {"name": "i", "value": 1, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 0], "type": "list"},
        {"name": "max_length", "value": 0, "type": "int"},
        {"name": "i", "value": 1, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 0], "type": "list"},
        {"name": "max_length", "value": 0, "type": "int"},
        {"name": "i", "value": 1, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 0, "type": "int"},
        {"name": "i", "value": 1, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 1, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 2, "type": "int"},
        {"name": "char", "value": "(", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 2, "type": "int"},
        {"name": "char", "value": "(", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 2, "type": "int"},
        {"name": "char", "value": "(", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 3, "type": "int"},
        {"name": "char", "value": "(", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 3, "type": "int"},
        {"name": "char", "value": "(", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 3, "type": "int"},
        {"name": "char", "value": "(", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2, 3], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 4, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1, 2], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 2, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 5, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": true, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": true, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": true, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [-1], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 6, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [6], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 7, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [7], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
        {"name": "s", "value": "()(()))))", "type": "str"},
        {"name": "map", "value": {"(": ")", "[": "]"}, "type": "dict"},
        {"name": "stack", "value": [8], "type": "list"},
        {"name": "max_length", "value": 6, "type": "int"},
        {"name": "i", "value": 8, "type": "int"},
        {"name": "char", "value": ")", "type": "str"},
        {"name": "not_empty", "value": false, "type": "bool"},
        {"name": "last_is_open", "value": false, "type": "bool"},
        {"name": "is_match", "value": false, "type": "bool"}
    ],
    [
    {
        "name": "s",
        "type": "str",
        "value": "()(()))))"
    },
    {
        "name": "map",
        "type": "dict",
        "value": {"(": ")", "[": "]"}
    },
    {
        "name": "stack",
        "type": "list",
        "value": [8]
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
        "value": ")"
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
];

export const task1Trace = [{ step: 1, currLine: 1, nextLine: 2, printOutput: [], frame: [] },
{ step: 2, currLine: 2, nextLine: 3, printOutput: [], frame: [] }];;

export const task0Trace = [{ step: 1, currLine: 1, nextLine: 2, printOutput: [], frame: [] },
{ step: 2, currLine: 2, nextLine: 3, printOutput: [], frame: [] }];;


export const taskTrace: TaskTraceType = {
    0: task0Trace,
    1: task1Trace,
    2: task2Trace,
    3: task3Trace,
    4: task4Trace,
};
