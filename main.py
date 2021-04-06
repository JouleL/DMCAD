import sys

V = 8

def findMaxVertex(visited, weights):

    index = -1

    maxW = -sys.maxsize

    for i in range(V):

        if (visited[i] == False and weights[i] > maxW):
            maxW = weights[i]
            index = i
    return index

def printMaximumSpanningTree(graph, parent):
    MST = 0
    for i in range(1, V):

        MST += graph[i][parent[i]]

    print("Вага максимального остового дерева ", MST)
    print("Ребра \tВага")
    for i in range(1, V):
        print(parent[i], " - ", i, " \t", graph[i][parent[i]])

def maximumSpanningTree(graph):
    visited = [True] * V
    weights = [0] * V
    parent = [0] * V

    for i in range(V):
        visited[i] = False
        weights[i] = -sys.maxsize

    weights[0] = sys.maxsize
    parent[0] = -1

    for i in range(V - 1):
        maxVertexIndex = findMaxVertex(visited, weights)

        visited[maxVertexIndex] = True

        for j in range(V):
            if (graph[j][maxVertexIndex] != 0 and visited[j] == False):

                if (graph[j][maxVertexIndex] > weights[j]):
                    weights[j] = graph[j][maxVertexIndex]
                    parent[j] = maxVertexIndex
    printMaximumSpanningTree(graph, parent)

n = 8
matr = []
with open('first1.txt', 'r') as f:
    l = [[int(num) for num in line.split(',')] for line in f]
if __name__ == '__main__':
    # Function call
    maximumSpanningTree(l)
