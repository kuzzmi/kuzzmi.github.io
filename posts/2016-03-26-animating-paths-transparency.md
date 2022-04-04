---
layout:      post
date:        2016-03-26 18:36:22 +0200
title:       "Animating Path's Transparency"
tags:
    - technology
    - android
    - development
    - animation
lang:        en
description: >
    A small example of implemetating a Path transparency animation with ObjectAnimator
---
At the moment I'm learning Android development and one of the issues that I faced was animating Path transparency.

I couldn't find a copy&paste solution, what is pretty strange as it should be a straightforward problem/solution.

This is why after making a few tries and finding something that is actually working, I'd like to share my solution.

```java
public class OverlayDrawView extends View {
    private Paint mPaint;
    private Path mPath;
    private float mAlpha;
    private ObjectAnimator mObjectAnimator;

    /**
     * Default constructor
     * @param context
     */
    public OverlayDrawView(Context context) {
        super(context);
        init();
    }

    /**
     * Default constructor
     * @param context
     */
    public OverlayDrawView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    /**
     * Default constructor
     * @param context
     */
    public OverlayDrawView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    /**
     * Setting up the painter to draw Path
     */
    private void init() {
        mPaint = new Paint();
        mPaint.setColor(Color.rgb(255, 255, 255));
        mPaint.setStrokeWidth(10);
        mPaint.setStyle(Paint.Style.STROKE);

        // Animating alpha channel from 0 to 255
        // Alpha channel is int, thus ObjectAnimator.ofInt is used
        mObjectAnimator = ObjectAnimator.ofInt(mPaint, "alpha", 0, 255);
        mObjectAnimator.setDuration(600);

        // Just Linear interpolation
        mObjectAnimator.setInterpolator(new LinearInterpolator());

        // Here you can handle value changes
        mObjectAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {

                // Casting changed Object as int to mPaint as a value of alpha
                mPaint.setAlpha((int) animation.getAnimatedValue());
                invalidate();
            }
        });
    }

    /**
     * onDraw event callback
     * @param canvas Canvas
     */
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (mPath != null) {
            canvas.drawPath(mPath, mPaint);
        }
    }

    /**
     * Setting path that has to be drawn
     * @param path Path
     */
    public void setPath(Path path) {
        this.mPath = path;
        mObjectAnimator.start();
    }
}
```
