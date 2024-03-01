package com.example.flutter_watch

import android.os.Bundle
import android.os.PersistableBundle
import android.view.MotionEvent
import com.samsung.wearable_rotary.WearableRotaryPlugin
import io.flutter.embedding.android.FlutterActivity

class MainActivity: FlutterActivity() {
    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        intent.putExtra("backgroundMode", "transparent")
        super.onCreate(savedInstanceState, persistentState)
    }

    override fun onGenericMotionEvent(event: MotionEvent?): Boolean {
        return when {
            WearableRotaryPlugin.onGenericMotionEvent(event) -> true
            else -> super.onGenericMotionEvent(event)
        }
    }
}
