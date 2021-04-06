import sys

V = 8
# Function to find index of max-weight
# vertex from set of unvisited vertices
def findMaxVertex(visited, weights):
    # Stores the index of max-weight vertex
    # from set of unvisited vertices
    index = -1

    # Stores the maximum weight from
    # the set of unvisited vertices
    maxW = -sys.maxsize

    # Iterate over all possible
    # Nodes of a graph
    for i in range(V):

        # If the current Node is unvisited
        # and weight of current vertex is
        # greater than maxW
        if (visited[i] == False and weights[i] > maxW):
            # Update maxW
            maxW = weights[i]

            # Update index
            index = i
    return index


# Utility function to find the maximum
# spanning tree of graph
def printMaximumSpanningTree(graph, parent):
    # Stores total weight of
    # maximum spanning tree
    # of a graph
    MST = 0

    # Iterate over all possible Nodes
    # of a graph
    for i in range(1, V):
        # Update MST
        MST += graph[i][parent[i]]

    print("Вага максимального остового дерева ", MST)
    print("Ребра \tВага")

    # Prthe Edges and weight of
    # maximum spanning tree of a graph
    for i in range(1, V):
        print(parent[i], " - ", i, " \t", graph[i][parent[i]])


# Function to find the maximum spanning tree
def maximumSpanningTree(graph):
    # visited[i]:Check if vertex i
    # is visited or not
    visited = [True] * V

    # weights[i]: Stores maximum weight of
    # graph to connect an edge with i
    weights = [0] * V

    # parent[i]: Stores the parent Node
    # of vertex i
    parent = [0] * V

    # Initialize weights as -INFINITE,
    # and visited of a Node as False
    for i in range(V):
        visited[i] = False
        weights[i] = -sys.maxsize

    # Include 1st vertex in
    # maximum spanning tree
    weights[0] = sys.maxsize
    parent[0] = -1

    # Search for other (V-1) vertices
    # and build a tree
    for i in range(V - 1):

        # Stores index of max-weight vertex
        # from a set of unvisited vertex
        maxVertexIndex = findMaxVertex(visited, weights)

        # Mark that vertex as visited
        visited[maxVertexIndex] = True

        # Update adjacent vertices of
        # the current visited vertex
        for j in range(V):

            # If there is an edge between j
            # and current visited vertex and
            # also j is unvisited vertex
            if (graph[j][maxVertexIndex] != 0 and visited[j] == False):

                # If graph[v][x] is
                # greater than weight[v]
                if (graph[j][maxVertexIndex] > weights[j]):
                    # Update weights[j]
                    weights[j] = graph[j][maxVertexIndex]

                    # Update parent[j]
                    parent[j] = maxVertexIndex

    # Prmaximum spanning tree
    printMaximumSpanningTree(graph, parent)

n = 8
matr = []
with open('first1.txt', 'r') as f:
    l = [[int(num) for num in line.split(',')] for line in f]
##print(l)

# Driver Code
if __name__ == '__main__':
    # Function call
    maximumSpanningTree(l)
