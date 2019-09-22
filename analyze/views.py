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
                dic['analyScore'] = res
                dic = json.dumps(dic)
                
                return HttpResponse(dic)
            else:
                print(request.POST.get('artiCont'))
                return HttpResponse('輸入錯誤')

        else:
            return HttpResponse('不得為空值')

    else:
        return HttpResponse('哎呀！出現錯誤')


def analyze(artiCont):
    #--------------------------------
    # 存停用詞, 分詞, 正向, 過濾後分詞
    #--------------------------------
    print('artiCont!!!!', artiCont)
    print('artiCont!!!!', type(artiCont))
    stopWords=[]
    segments=[]
    positives=[]
    negatives=[]
    remainderWords=[]
    sentiWords = {}
    weights=[]
    
    analyzeScore= 0
    positive = 0
    negative = 0
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
            # print(items)
            # print(items[1])
            # print(items[2])
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
    print(evaluation/len(weights))
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
    # 讀入文件檔, 進行中文斷詞
    #--------------------------------
    # with open('data.txt', 'r', encoding='UTF-8') as file:
    #     #讀入文檔
    #     text = file.read()

    #     #結巴中文斷詞
    #     segments = jieba.cut(text, cut_all=False)

    segments = jieba.cut(artiCont, cut_all=False)

    #------------------------------
    # 移除停用詞及跳行符號
    #------------------------------
    remainderWords = list(filter(lambda a: a not in stopWords and a != '\n', segments))

    #------------------------------
    # 印出過濾後屬於正向的分詞
    #------------------------------
    for k in remainderWords:
        if k in positives:
            positive = positive + 1
            # analyscore = analyscore +1 
            print(k)

    print('正向詞總共有'+ str(positive))

    #------------------------------
    # 印出過濾後屬於負向的分詞
    #------------------------------
    for j in remainderWords:
        if j in negatives:
            # analyscore = analyscore - 1 
            negative = negative + 1
            print(j)

    print('負向詞總共有'+ str(negative))
    print('analyScore = ' + str(abs(positive-negative)))

    # seg_list = jieba.cut("新竹的交通大學在新竹的大學路上", cut_all=True)
    # print("Full Mode: " + "/ ".join(seg_list))  # 全模式
    # print(seg_list)
    return analyzeScore, positive, negative


def saveAnalyzeData(score):
    return False
