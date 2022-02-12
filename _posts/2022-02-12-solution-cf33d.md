---
layout: post
title: 题解 CF33D Knights
subtitle: 
categories: 题解
tags: CF LCA 图论
---
### 题目描述

你是一位OIer，今天教练刚讲了LCA，你看到了[CF33D Knights](https://www.luogu.com.cn/problem/CF33D)，打算做一下它

你简化了问题：给你几个点的坐标和几个圆的坐标与半径（**任意两个圆都没有交叉点**），求一个点到另一个点最少经过几个圆。

### 思路

你想到了一个做法：如果圆$A$包含圆$B$，且圆$A$是**包含圆$B$的圆**中**半径最小**的，则将$A$、$B$连边，容易证得得到的是一个**森林**，而**最外层**的圆自然地连接到了**虚根**0号结点。然后我们计算出每一个**点属于哪一个圆**（这里的属于定义为：圆A包含点B，且圆$A$是**包含点$B$的圆**中**半径最小**的），查询的时候就通过**LCA**和树的**深度**求得**点所属圆**在**树上的最短距离**。

### 代码处理

但是第一个问题出现了：如何判断圆$A$是包含圆$B$的圆中半径最小的？

你想了想，处理方案如下：

1.先将所有圆以**半径**为关键字**升序**排序

2.以下标为序搜索每一个圆，代码如下：

~~~cpp
void df(int q)//搜索第q个圆//不要在意变量名
{
	if(v[q])return;//如果被搜索过了则return
	v[q]=1;//标记
	for(int i=1;i<=m;i++)//循环每一个圆
	{
		if(check(q,i)&&i!=q)//check(q,j)的意思是圆q能被圆i包含，下同
		{//如果圆q被圆i包含且i不等于q
			adde(q,i);
			adde(i,q);//加边
			df(i);//搜索地i个圆
			return;
		}
	}
}//这样就可以保证圆i是包含圆q的圆中半径最小的
~~~

第二个问题：怎么找到**最外层**的圆？

下面是处理方式+代码：

~~~cpp
for(int i=1;i<=m;i++)//循环每一个圆
   {
    bool p=1;
    for(int j=i+1;j<=m;j++)
    {
        if(check(i,j))p=0;//如果i能被其他圆包含，则一定不是最外层的圆
    }
    if(p)adde(i,0),adde(0,i);//加边
}
~~~

你的一个朋友发表不同意见：”其实可以加一个**无限大的圆**使**其它圆被它包含**“。

第三个问题：如何确定点属于哪一个圆？

处理方式+代码：

~~~ cpp
for(int i=1;i<=m;i++)//循环圆
{
    for(int j=1;j<=n;j++)//循环点
    {
        if(!z[j]&&(判断点是否在圆内)/*代码很长且可读性较差，故不展示*/)z[j]=i;//建立关系
    }//因为圆是按半径排列的，所以如果圆i包含了点j，则圆i+1一定包含点j
}    //所以要判断点j是否已经建立关系，防止重复建立关系
for(int i=1;i<=n;i++)if(!z[i])z[i]=0;
//如果没有圆与这个点建立关系就代表这个点与虚根相连
//或者说这个点属于最外面的无限大的圆
~~~

### 主函数代码实现

~~~cpp
int main()
{
    scanf("%d%d%d",&n,&m,&T);
    for(int i=1;i<=n;i++)scanf("%d%d",&mp[i][1],&mp[i][2]);
    for(int i=1;i<=m;i++)scanf("%d%d%d",&O[i].r,&O[i].x,&O[i].y);//输入
    sort(O+1,O+m+1,cmp);//排序
    for(int i=1;i<=m;i++)
    {
        if(!v[i])df(i);
    }//问题一
    for(int i=1;i<=m;i++)
	{
        bool p=1;
        for(int j=i+1;j<=m;j++)
		{
            if(check(i,j))p=0;
        }
        if(p)adde(i,0),adde(0,i);
    }//问题二
    dfs(0,0);//LCA基本操作
    for(int i=1;i<=m;i++)
    {
        for(int j=1;j<=n;j++)
		{
              if(!z[j]&&(long long)((long long)(O[i].x-mp[j][1])*(O[i].x-mp[j][1])+(long long)(O[i].y-mp[j][2])*(O[i].y-mp[j][2]))<=(long long)O[i].r*O[i].r)z[j]=i;
        }
    }
    for(int i=1;i<=n;i++)if(!z[i])z[i]=0;//问题三
    while(T--)
	{
        int q,w;
        scanf("%d%d",&q,&w);
        printf("%d\n",d[z[w]]+d[z[q]]-2*d[LCA(z[q],z[w])]);
        //找到最少次数并输出
    }
}
~~~
### 完整代码
~~~ cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e3+5,M=1E3+5;
struct sss
{
	int q,w,e,nxt;
}a[M*2];
struct ssr
{
	int x,y,r;
}O[N];
int head[N],p[N][25],d[N],n,T,cnt,mp[N][3],m,num[N],vis[N],vi[N],z[N],v[N];
void adde(int q,int w)
{
	a[++cnt].q=q;
	a[cnt].w=w;
	a[cnt].nxt=head[q];
	head[q]=cnt;
}
bool cmp(ssr a,ssr s)
{
	return a.r<s.r;
}
void dfs(int q,int fa)
{
	d[q]=d[fa]+1;
	p[q][0]=fa;
	bool o=1;
	for(int i=1;i<=20;i++)p[q][i]=p[p[q][i-1]][i-1];
	for(int i=head[q];i;i=a[i].nxt)
	{
		if(a[i].w!=fa)
		{
			o=0;
			dfs(a[i].w,q);
		}
	}
	if(o)vi[q]=1;
}
int LCA(int a,int s)
{
	if(d[a]>d[s])swap(a,s);
	for(int i=20;i>=0;i--)
	{
		if(d[a]<=d[s]-(1<<i))s=p[s][i];
	}
	if(a==s)return a;
	for(int j=20;j>=0;j--)
	{
		if(p[a][j]!=p[s][j])a=p[a][j],s=p[s][j];
	}
	return p[a][0];
}
bool check(int i,int j)
{
	return O[j].r>=O[i].r&&(long long)((long long)(O[i].x-O[j].x)*(O[i].x-O[j].x)+(long long)(O[i].y-O[j].y)*(O[i].y-O[j].y))<=(long long)O[j].r*O[j].r;
}
void df(int q)
{
	if(v[q])return;
	v[q]=1;
	for(int i=1;i<=m;i++)
	{
		if(check(q,i)&&i!=q)
		{
			adde(q,i);
			adde(i,q);
			df(i);
			return;
		}
	}
}
int main()
{
	scanf("%d%d%d",&n,&m,&T);
	for(int i=1;i<=n;i++)scanf("%d%d",&mp[i][1],&mp[i][2]);
	for(int i=1;i<=m;i++)scanf("%d%d%d",&O[i].r,&O[i].x,&O[i].y);
	sort(O+1,O+m+1,cmp);
	for(int i=1;i<=m;i++)
	{
		if(!v[i])df(i);
	}
	for(int i=1;i<=m;i++)
	{
		bool p=1;
		for(int j=i+1;j<=m;j++)
		{
			if(check(i,j))p=0;
		}
		if(p)adde(i,0),adde(0,i);
	}
	dfs(0,0);
	for(int i=1;i<=m;i++)
	{
		for(int j=1;j<=n;j++)
		{
			if(!z[j]&&(long long)((long long)(O[i].x-mp[j][1])*(O[i].x-mp[j][1])+(long long)(O[i].y-mp[j][2])*(O[i].y-mp[j][2]))<=(long long)O[i].r*O[i].r)z[j]=i;
		}
	}
	for(int i=1;i<=n;i++)if(!z[i])z[i]=0;
	while(T--)
	{
		int q,w;
		scanf("%d%d",&q,&w);
		printf("%d\n",d[z[w]]+d[z[q]]-2*d[LCA(z[q],z[w])]);
	}
}
~~~
