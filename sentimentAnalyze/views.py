from django.shortcuts import render
from django.http import HttpResponse
from django.db import models
import jieba
import json


# Create your views here.

def post(request):
    if request.method == 'POST':
        dic = {}
        if request.POST:
            artiCont = request.POST.get('artiCont', '')
            if artiCont:
                res = analyze(artiCont)
                dic['analyze'] = res
                dic = json.dumps(dic)
                return HttpResponse(dic)
            else:
                # print(request.POST.get('artiCont'))
                return HttpResponse('輸入錯誤')

        else:
            return HttpResponse('不得為空值')

    else:
        return HttpResponse('哎呀！出現錯誤')


def analyze(artiCont):
    #--------------------------------
    # 存停用詞, 分詞, 正向, 過濾後分詞
    #--------------------------------
    stopWords=[]
    inverseWords=[]
    segments=[]
    degreeMost=[]
    degreeVery=[]
    degreeMore=[]
    degreeIsh=[]
    
    positives=[]
    negatives=[]
    profanity=[]
    remainderWords=[]
    sentiWords = {}
    degreeWords = {}
    weights=[]
    
    scanIndex = 0 
    sentimentIndex = 0
    analyzeScore= 0
    positive = 0
    positiveSum = 0 
    negative = 0
    negativeSum = 0
    swearWord = 0
    result = []


    #--------------------------------
    # degreeWords
    #--------------------------------
    with open('degreeMost.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            degreeMost.append(data)
    with open('degreeVery.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            degreeVery.append(data)
    with open('degreeMore.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            degreeMore.append(data)
    with open('degreeIsh.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            degreeIsh.append(data)

    # print(degreeMost, degreeVery, degreeMore, degreeIsh)
    #--------------------------------
    # inverseWords
    #--------------------------------
    with open('inverseWords.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            inverseWords.append(data)

    #--------------------------------
    # 讀入停用詞檔
    #--------------------------------
    with open('stopWords.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            stopWords.append(data)

    #---------------------
    # 元智大學語料庫
    #---------------------
    with open('sentimentWords.csv', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            # print(data)
            items = data.split(',')
            sentiWords[items[1]] = items[2]
            # print(sentiWords)
    # print(sentiWords)  

    #---------------------
    # 文章內的情緒詞及權重
    #---------------------
    s =  jieba.cut(artiCont)
    for k in s:
        try:
            weights.append((k, sentiWords[k]))
        except:
            pass

    #---------------------
    # 評估
    #---------------------
    evaluation = 0

    for k in weights:
        evaluation = evaluation + (float(k[1]) - 5)

    print(weights)
    if len(weights) != 0 :
        # print(evaluation/len(weights))
        analyzeScore = evaluation/len(weights)
    

    #--------------------------------
    # 讀入正向情緒詞檔
    #--------------------------------
    with open('positives.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            positives.append(data)
    #--------------------------------
    # 讀入負向情緒詞檔
    #--------------------------------
    with open('negatives.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            negatives.append(data)
    #--------------------------------
    # 讀入不雅字詞檔
    #--------------------------------
    with open('profanity.txt', 'r', encoding='UTF-8') as file:
        for data in file.readlines():
            data = data.strip()
            profanity.append(data)

    #--------------------------------
    # 結巴中文斷詞
    #--------------------------------
    segments = jieba.cut(artiCont, cut_all=False)

    #------------------------------
    # 移除停用詞及跳行符號
    #------------------------------
    remainderWords = list(filter(lambda a: a not in stopWords and a != '\n', segments))
    print(remainderWords)

    #------------------------------
    # 印出過濾後屬於正向的分詞
    #------------------------------
    
    for k in remainderWords:
        if k in positives:
            positive = 1
            inverseNum = 0
            for i in remainderWords[remainderWords.index(k)-2:remainderWords.index(k)]:
                if i in degreeMost:
                    print('degreeMost', i)
                    positive  = positive * 4
                elif i in degreeVery:
                    print('degreeVery', i)
                    positive = positive * 3
                elif i in degreeMore:
                    print('degreeMore', i)
                    positive = positive * 2
                elif i in degreeIsh:
                    print('degreeIsh', i)
                    positive = positive * 1.5
                elif i in inverseWords:
                    print('inverse',  i)
                    inverseNum  = inverseNum + 1
            if isOdd(inverseNum) == 'odd' :
                positive = positive * -1
                positiveSum = positiveSum + positive
            else:
                positiveSum = positiveSum + positive
                    
        #------------------------------
        # 印出過濾後屬於負向的分詞
        #------------------------------
        elif k in negatives: 
            negative = 1
            inverseNum = 0
            print('neg', k)
            for i in remainderWords[remainderWords.index(k)-2:remainderWords.index(k)]:
                if i in degreeMost:
                    print('degreeMost', i)
                    negative  = negative * 4
                elif i in degreeVery:
                    print('degreeVery', i)
                    negative = negative * 3
                elif i in degreeMore:
                    print('degreeMore', i)
                    negative = negative * 2
                elif i in degreeIsh:
                    print('degreeIsh', i)
                    negative = negative * 1.5
                elif i in inverseWords:
                    print('inverse',  i)
                    inverseNum  = inverseNum + 1
            if isOdd(inverseNum) == 'odd' :
                negative = negative * -1
                negativeSum = negativeSum + negative
            else:
                negativeSum = negativeSum + negative

            
    #------------------------------
    # 印出過濾後屬於不雅字的分詞
    #------------------------------
    for j in remainderWords:
        if j in profanity:
            # analyscore = analyscore - 1 
            swearWord = swearWord + 1

    print('負向詞總共有'+ str(negativeSum))
    print('analyScore = ' + str(abs(positive-negative)))
    print('不雅字總共有' + str(swearWord))
    
    result = [analyzeScore,positiveSum,negativeSum,swearWord,positiveSum-negativeSum]
    return result



def isOdd(num):
    if num % 2 == 0:
        return 'even'
    else:
        return 'odd'


def saveAnalyzeData(score):
    return False
