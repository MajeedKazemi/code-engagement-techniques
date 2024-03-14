export enum EditorType {
    baseline = "baseline",
    pseudo = "pseudo",
    parsons = "parsons",
    writeover = "writeover",
    selfexplain = "selfexplain",
    stepByStep = "stepByStep",
    verify = "verify",
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

export const task2Trace = 
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
]
