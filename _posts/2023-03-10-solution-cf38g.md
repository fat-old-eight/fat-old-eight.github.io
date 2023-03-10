---
layout : post
title : CF38G Queue 题解
categories: 题解
tags: 数据结构 平衡树
---

发现大多都是Splay的，来水一个FHQ的。

### 做法
首先为了方便实现，我们先将整个队列反转一下，原问题就变成了在队列前 $c_i$ 个数中插入一个数（位置为 $k$），使得对于任意的 $1\leq j < k \leq c_i+1$ 都有 $a_j < a_k$。（很好理解吧。）

好了现在问题就解决了，先建一个以下标为权值的FHQ。

然后对于每次插入，先以大小分裂出 $x$ 和 $z$ 两棵树，然后再在 $x$ 中根据前缀最大值分裂出 $x$ 和 $y$ 两棵树，将新节点插入 $x$ 与 $y$ 之间即可。

输出类似中序遍历，但是要先访问右儿子。

### 代码

~~~ cpp
#include<algorithm>
#include<iostream>
using namespace std;
struct FHQ
{
    int root,cnt;
    struct sss
    {
        int l,r,s,v,w,mx,id,rmx;
        #define l(x) tree[x].l
        #define r(x) tree[x].r
        #define s(x) tree[x].s
        #define v(x) tree[x].v
        #define w(x) tree[x].w
        #define mx(x) tree[x].mx
        #define id(x) tree[x].id
        #define rmx(x) tree[x].rmx
    }tree[1000005];
    int New(int x,int id)
    {
        w(++cnt)=rand();
        s(cnt)=1;
        rmx(cnt)=v(cnt)=mx(cnt)=x;
        id(cnt)=id;
        return cnt;
    }
    void pushup(int x)
    {
    	s(x)=s(l(x))+s(r(x))+1;
        mx(x)=max({mx(l(x)),mx(r(x)),v(x)});
        rmx(x)=max(mx(l(x)),v(x));
    }//维护前缀最大值
    void splits(int root,int s,int &x,int &y)
    {
        if(!root)x=y=0;
        else if(s(l(root))<s)
        {
            x=root;
            splits(r(root),s-s(l(root))-1,r(x),y);
            pushup(root);
        }
        else
        {
            y=root;
            splits(l(root),s,x,l(y));
            pushup(root);
        }
    }
    void splitv(int root,int key,int &x,int &y)
    {
        if(!root)x=y=0;
        else if(rmx(root)<=key)
        {
            x=root;
            splitv(r(root),key,r(x),y);
            pushup(root);
        }
        else
        {
            y=root;
            splitv(l(root),key,x,l(y));
            pushup(root);
        }
    }
    int merge(int x,int y)
    {
        if(!x||!y)return x^y;
        else if(w(x)>w(y))
        {
            r(x)=merge(r(x),y);
            pushup(x);
            return x;
        }
        else
        {
            l(y)=merge(x,l(y));
            pushup(y);
            return y;
        } 
    }
    void insert(int key,int c,int id)//插入
    {
        int x,y,z;
        splits(root,c,x,z);
        splitv(x,key-1,x,y);
        root=merge(merge(merge(x,New(key,id)),y),z);
    }
    void print(int x)//输出
    {
        if(r(x))print(r(x));
        printf("%d ",id(x));
        if(l(x))print(l(x));
    }
}T1;
int T;
int main()
{
    scanf("%d",&T);
    for(int i=1;i<=T;i++)
    {
        int key,c;
        scanf("%d%d",&key,&c);
        T1.insert(key,c,i);
    }
    T1.print(T1.root);
}
~~~