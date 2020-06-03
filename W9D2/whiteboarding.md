Problem #1
Given two non-empty binary trees s and t, check whether tree t has exactly the
same structure and node values with a subtree of s.
A subtree of s is a tree consists of a node in s and all of this node's
descendants.
The tree s could also be considered as a subtree of itself.
Example 1:
Given tree s:
     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4 
  / \
 1   2
Return true because t has the same structure and node values with a subtree of s.
Example 2:
Given tree s:
     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false.

Perform a breadth first search until I find the parent node of the subtree
If I find that parent node, I will perform depth first search and check along the
way, to see if every node matches up perfectly
[
  {'3': {
    'value': 3,
    'children': [
      '4': [
        'value': 4,
        'children': [
          '1': {'value': 1},
          '2': {'value': 2}
        ]
      ]],
      '5': {value: 5}
    ]
  ]
  }}
]

function isSubstree(inputTree, subTree) {
  let queue = [inputTree[0]];
  let search = subTree.slice();

   while (queue.length !== 0) {
     

    while (search.length !== 0) {
      let node = queue.shift();

      if (node.value === search[0].value) {
        <!-- search = search[0].children; -->
        return helperFunction();
      } else {
        queue.push(...node.children)
      }


    }
    
   }

}

Problem #2
Given a sequence of words, check whether it forms a valid word square.
A sequence of words forms a valid word square if the kth row and column read
the exact same string, where 0 ≤ k < max(numRows, numColumns).
Note:
The number of words given is at least 1 and does not exceed 500.
Word length will be at least 1 and does not exceed 500.
Each word contains only lowercase English alphabet a-z.
Example 1:
Input:
[
  "abcd",
  "bnrt",
  "crmy",
  "dtye"
]
Output:
true
Explanation:
The first row and first column both read "abcd".
The second row and second column both read "bnrt".
The third row and third column both read "crmy".
The fourth row and fourth column both read "dtye".
Therefore, it is a valid word square.
Example 2:
Input:
[
  "abcd",
  "bnrt",
  "crm",
  "dt"
]
Output:
true
Explanation:
The first row and first column both read "abcd".
The second row and second column both read "bnrt".
The third row and third column both read "crm".
The fourth row and fourth column both read "dt".
Therefore, it is a valid word square.
Example 3:
Input:
[
  "ball",
  "area",
  "read",
  "lady"
]
Output:
false
Explanation:
The third row reads "read" while the third column reads "lead".
Therefore, it is NOT a valid word square.
Find your pair and have fun with these!!

Remember the Interviewer / Interviewee relationship.  
If you are solo today and you would like to have a partner for these,
please slack me and I will pair you up!


Use nested loops. Outer loop would iterate through the rows in the array, and the inner loop would 
iterate through the "columns" (each character of the word). arr[1][0] === arr[0][1]

function validWordSquare(wordSqaure) {

  for(let i = 0; i < wordSquare.length; i++) {
    for (let j = 0; j < wordSquare[i].lenght; j++) {
      if (wordSquare[i][j] !== wordSquare[j][i]) {
        return false;
      }
    }
  }

  return true;
}