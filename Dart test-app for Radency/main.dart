List<List<int>> combinations = [];

void main() {

  print(chooseBestDistance(174, 3, [51, 56, 58, 59, 61]));
  
}

int chooseBestDistance(int t, int k, List<int> ls) {
  
  getCombinations(ls, k);
  
  List<int> sumArray = combinations.map((element) => 
    element.reduce((sum, current) => sum + current)
  ).toList();
  
  sumArray.sort((a, b) => b - a);
  
  return sumArray.firstWhere((x) => x <= t, orElse: () => -1);
  
}


void getCombinations(List<int> arr, int r) {
  int arrayLength = arr.length;
  List<int> tempData = List<int>.filled(arrayLength, 0);
  combinationUtil(arr, tempData, 0, arrayLength - 1, 0, r);
}

void combinationUtil(List<int> arr, List<int> data, int start, int end, int index, int r) {
  List<int> combination = [];
  
  if (index == r) {
    for (int j = 0; j < r; j++) {
      combination.add(data[j]);
    }
  }
  
  if (combination.length == r) combinations.add(combination);
  
  for (int i = start; i <= end && end - i + 1 >= r - index; i++) {
    data[index] = arr[i];
    combinationUtil(arr, data, i + 1, end, index + 1, r);
  }
}

