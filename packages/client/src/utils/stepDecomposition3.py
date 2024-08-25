import json
steps = [
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
        "nextLine": None,
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

decomposition = {
    "complex-multiline-blocks": [
        {
            "begin-line": 7,
            "end-line": 8,
            "top-two-changing-variables": ["dq", "n"],
            "question-about-purpose-of-code": "What is the role of the while loop that pops elements from the deque 'dq'?",
            "answer": "It ensures that 'dq' is in decreasing order, which is crucial for finding the maximum in the sliding window.",
        },
        {
            "begin-line": 5,
            "end-line": 6,
            "top-two-changing-variables": ["dq", "i"],
            "question-about-purpose-of-code": "Why are elements being popped from the front of the deque 'dq' in the if condition?",
            "answer": "This removes elements that are outside the current window, ensuring the window size remains valid.",
        },
        {
            "begin-line": 10,
            "end-line": 11,
            "top-two-changing-variables": ["result", "dq"],
            "question-about-purpose-of-code": "Why are we appending 'nums[dq[0]]' to the result list?",
            "answer": "This appends the maximum of the current window to the result list, as 'dq[0]' always holds the index of the maximum.",
        },
    ],
    "complex-single-line-codes": [
        {
            "begin-line": 9,
            "end-line": 9,
            "top-two-changing-variables": ["dq"],
            "question-about-purpose-of-code": "Why is the current index 'i' being appended to 'dq'?",
            "answer": "Appending 'i' to 'dq' is essential for tracking elements within the current window.",
        },
        {
            "begin-line": 11,
            "end-line": 11,
            "top-two-changing-variables": ["result"],
            "question-about-purpose-of-code": "What is the significance of appending 'nums[dq[0]]' to 'result'?",
            "answer": "This adds the maximum of the current window to the result list, as 'dq[0]' always holds the index of the maximum.",
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
        if in_range and step['nextLine'] == end_line:
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
    print(step_ranges)
    
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
