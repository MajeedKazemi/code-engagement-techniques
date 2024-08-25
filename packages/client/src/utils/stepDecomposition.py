import json
steps = [
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
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": False
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": False
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": False
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
            }
        ]
    },
    {
        "step": 110,
        "currLine": 18,
        "nextLine": None,
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
                "value": True
            },
            {
                "name": "last_is_open",
                "type": "bool",
                "value": True
            },
            {
                "name": "is_match",
                "type": "bool",
                "value": True
            }
        ]
    }
]

decomposition = {
  "complex-multiline-blocks": [
    {
      "begin-line": 10,
      "end-line": 15,
      "top-two-changing-variables": ["stack", "max_length"],
      "question-about-purpose-of-code": "What is the purpose of the block of code from lines 10 to 15 that checks for certain conditions and updates the stack and max_length?",
      "answer": "This block handles closing brackets. It checks if the top of the stack is an opening bracket that matches the current bracket. If so, it pops the stack and updates max_length."
    },
    {
      "begin-line": 7,
      "end-line": 8,
      "top-two-changing-variables": ["stack", "char"],
      "question-about-purpose-of-code": "Why does the code append the index of the opening brackets to the stack in lines 7 and 8?",
      "answer": "Appending the index of the opening brackets to the stack helps keep track of the brackets and their positions, which is useful for calculating the length of the valid substring."
    }
  ],
  "complex-single-line-codes": [
    {
      "begin-line": 15,
      "end-line": 15,
      "top-two-changing-variables": ["max_length", "i"],
      "question-about-purpose-of-code": "How does the line 15 update the max_length variable?",
      "answer": "It updates max_length to be the maximum of the current max_length and the difference between the current index and the top of the stack, representing the length of the valid substring."
    },
    {
      "begin-line": 17,
      "end-line": 17,
      "top-two-changing-variables": ["stack", "i"],
      "question-about-purpose-of-code": "What is the purpose of updating the top of the stack to the current index in line 17?",
      "answer": "If the conditions are not met, the top of the stack is updated to the current index to prepare for the next comparison of opening and closing brackets."
    }
  ]
}

def find_step_ranges(begin_line, end_line, steps):
    start_steps = []
    end_steps = []

    in_range = False
    for step in steps:
        if step['currLine'] == begin_line:
            in_range = True
            start_steps.append(step['step'])
        if in_range and step['currLine'] == end_line:
            end_steps.append(step['step'])
            in_range = False

    return list(zip(start_steps, end_steps))

# Generate new JSON structure
new_structure = {
    "complex-multiline-blocks": [],
    "complex-single-line-codes": []
}

# Process complex multiline blocks
for block in decomposition['complex-multiline-blocks']:
    begin_line = block['begin-line']
    end_line = block['end-line']
    
    step_ranges = find_step_ranges(begin_line, end_line, steps)
    
    for start_step, end_step in step_ranges:
        if end_step - start_step <= 50 and end_line - begin_line <= 7:
            new_block = {
                "begin-line": begin_line,
                "end-line": end_line,
                "start-step": start_step,
                "end-step": end_step,
                "top-two-changing-variables": block["top-two-changing-variables"],
                "question-about-purpose-of-code": block["question-about-purpose-of-code"],
                "answer": block["answer"]
            }
            new_structure["complex-multiline-blocks"].append(new_block)

# Process complex single line codes
for code in decomposition["complex-single-line-codes"]:
    line = code["begin-line"]
    
    for step in steps:
        if step['currLine'] == line:
            new_code = {
                "begin-line": line,
                "end-line": line,
                "start-step": step['step'],
                "end-step": step['step'],
                "top-two-changing-variables": code["top-two-changing-variables"],
                "question-about-purpose-of-code": code["question-about-purpose-of-code"],
                "answer": code["answer"]
            }
            new_structure["complex-single-line-codes"].append(new_code)
            
            
import random
import json

def add_followup_questions(structure):
    random.seed(42)  # Ensure reproducibility if needed
  
    # Collect questions from multiline blocks and single line codes
    question_pool = []
    unique_blocks = {}

    for block in structure["complex-multiline-blocks"]:
        key = (block["begin-line"], block["end-line"])
        if key not in unique_blocks:
            unique_blocks[key] = {
                "step": block["start-step"],
                "begin-line": block["begin-line"],
                "end-line": block["end-line"],
                "question-about-purpose-of-code": block.get("question-about-purpose-of-code", ""),
                "answer": block.get("answer", ""),
                "top-two-variables": block["top-two-changing-variables"]
            }
        question_pool.append({
            "step": block["start-step"],
            "begin-line": block["begin-line"],
            "end-line": block["end-line"],
            "question-about-purpose-of-code": block.get("question-about-purpose-of-code", ""),
            "answer": block.get("answer", ""),
            "top-two-variables": block["top-two-changing-variables"]
        })

    for code in structure["complex-single-line-codes"]:
        key = (code["begin-line"], code["end-line"])
        if key not in unique_blocks:
            unique_blocks[key] = {
                "step": code["start-step"],
                "begin-line": code["begin-line"],
                "end-line": code["end-line"],
                "question-about-purpose-of-code": code.get("question-about-purpose-of-code", ""),
                "answer": code.get("answer", ""),
                "top-two-variables": code["top-two-changing-variables"]
            }
        question_pool.append({
            "step": code["start-step"],
            "begin-line": code["begin-line"],
            "end-line": code["end-line"],
            "question-about-purpose-of-code": code.get("question-about-purpose-of-code", ""),
            "answer": code.get("answer", ""),
            "top-two-variables": code["top-two-changing-variables"]
        })

    # Ensure all unique blocks are in the selected questions
    unique_blocks_list = list(unique_blocks.values())
    
    def get_random_questions(question_pool, unique_blocks_list, num_questions=7):
        attempts = 0  # To avoid endless loops
        max_attempts = 1000

        # Ensure we fulfill the constraints
        while attempts < max_attempts:
            selected_questions = unique_blocks_list[:]

            additional_questions_needed = num_questions - len(selected_questions)
            additional_questions = random.sample(question_pool, additional_questions_needed)
            
            # Check for duplicate steps
            steps_set = {q['step'] for q in selected_questions}
            valid_additional_questions = [
                q for q in additional_questions if q['step'] not in steps_set
            ]

            if len(valid_additional_questions) == additional_questions_needed:
                selected_questions.extend(valid_additional_questions)
                selected_questions.sort(key=lambda x: x['step'])
                return selected_questions

            attempts += 1

        raise Exception("Unable to meet constraints within maximum attempts")

    selected_questions = get_random_questions(question_pool, unique_blocks_list)

    # Ensure to remove `question-about-purpose-of-code` and `answer` from duplicates
    def clean_structure(blocks):
        seen = set()
        cleaned_blocks = []
        for block in blocks:
            key = (block["begin-line"], block["end-line"])
            if key in seen:
                block.pop("question-about-purpose-of-code", None)
                block.pop("answer", None)
            else:
                seen.add(key)
            cleaned_blocks.append(block)
        return cleaned_blocks

    structure["complex-multiline-blocks"] = clean_structure(structure["complex-multiline-blocks"])
    structure["complex-single-line-codes"] = clean_structure(structure["complex-single-line-codes"])

    return selected_questions, structure




selected_questions, cleaned_structure = add_followup_questions(new_structure)
new_structure_with_questions = {
    "complex-multiline-blocks": cleaned_structure["complex-multiline-blocks"],
    "complex-single-line-codes": cleaned_structure["complex-single-line-codes"],
    "selected-questions": selected_questions
}
print(json.dumps(new_structure_with_questions, indent=2))
